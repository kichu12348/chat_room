import React, { useState, useRef } from 'react';
import './App.css';
import Auth from './components/Auth';
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const authCookie = cookies.get('auth-token');
  console.log('Auth Cookie:', authCookie);

  const [isAuth, setIsAuth] = useState(authCookie);
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(0)


  const handleEnterChat = () => {
    //  logic to set the room state
    setRoom(/*value here */);
  };

  const signUserOut=async ()=>{
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)

  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className='stylerboi'>
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className='room'>
          
          <input ref={roomInputRef} placeholder='Enter Chat Name' className='RoomNameInput'/>
          <button type='button' onClick={()=> setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
      <div className='sign-out'>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
