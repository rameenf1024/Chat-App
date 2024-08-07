const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server}  = require("socket.io");

app.use(cors(
    {
        origin: ["http://localhost:3000", "http://localhost:3002"], // List all the allowed origins here
        methods: ["GET", "POST"],
    }
));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:  ["http://localhost:3000", "http://localhost:3002"],
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

  // To handle joining rooms
socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
});

    // gives the message in backend to tell either the server is running or not 
    
    socket.on("send_message", (data) => {
        // console.log(`Message received: ${data}`);
        socket.to(data.room).emit("receive_message", data)
        // console.log(data);
    });

    socket.on("disconnect", () =>{
        console.log("USER DISCONNECTED", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});