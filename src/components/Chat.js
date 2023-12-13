import React, { useEffect, useRef, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "./styler/Chat.css";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, 'messages');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where('room', '==', room),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      setNewMessage(''); // Move the setNewMessage inside the callback
    });

    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === '') return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    // Remove the setNewMessage here
  };

  return (
    <div className="chat-app">
      <div className="ChatRoomName">
        <h1>Chat Room: {room}</h1>
      </div>

      <div className="MessageBox">
        <div className="scroll-div">
          <div id="message-container" className="scroll-object">
            {messages.map((message) => (
              <div key={message.id}>
                <span className="username">{message.user} :</span>
                <div className="userMessage">{message.text}</div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type Your Message Here....."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />

        <button type="submit" className="send-button">
          <img
            src={require('./styler/images/send.png')}
            className="send-button-image"
            alt="send"
          />
        </button>
      </form>
    </div>
  );
};
