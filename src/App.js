import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';


const socket = io.connect("http://localhost:3001");
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () =>{
    if (username !=="" && room !==""){
      socket.emit("join_room",room)
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      <div className="navbar">Chat Application</div>
      {!showChat ? (
     <div className="joinChatContainer">
        <h4>Join chat</h4>

        <input type="text " placeholder="name..." onChange={(event) => {setUsername(event.target.value)} } 
        />

        <input type="text " placeholder="room id..." onChange={(event) => {setRoom(event.target.value)} }
        />

        <button onClick = {joinRoom}>Join Room</button>
      </div>
      ) 
    :(
      <Chat socket = {socket} username = {username} room = {room}/>
    )}
    </div>
  );
}

export default App;
