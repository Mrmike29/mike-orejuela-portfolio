import './App.css';
import { useState } from 'react';
import io from 'socket.io-client';
import ChatBotton from './components/ChatBotton';
import ChatBox from './components/ChatBox';
import LoginChat from './components/LoginChat';

const socket = io.connect("https://mike-orejuela-portfolio-server.onrender.com");

function App() {
  const [username, setUsername] = useState("");

  const newUsername = (event) => {
    setUsername(event.target.value);
    console.log(username)
  }

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  const [showModalLogin, setShowModalLogin] = useState(false);
  const handleCloseLogin = () => setShowModalLogin(false);
  const handleOpenLogin = () => setShowModalLogin(true);

  const joinRoom = () => {
    if (username.trim() !== "") {
      setShowModalLogin(false);
      setShowModal(true);
      socket.emit("join_room");
    }
  }

  return (
    <div className="App">
      <LoginChat
       joinRoom={joinRoom}
       show={showModalLogin}
       onChange={newUsername}
       onHide={handleCloseLogin}
       handleClose={handleCloseLogin} />

      <ChatBox
       show={showModal}
       user={username}
       socket={socket}
       onHide={handleClose}
       handleClose={handleClose} />

      <ChatBotton 
      handleOpen={(username !== "")? handleOpen : handleOpenLogin } />
      <h1 style={{color: 'white'}}>Holaaaaaaaaa</h1>
    </div>
  );
}

export default App;
