const port = 8080;
const express = require("express");
const app = express();
const colors = require("colors");
const cors = require("cors");
const http = require("http");

const { addUser, removeUser, getUser, getUserInRoom } = require("./users");

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//kur te kemi nje klient connection kjo do te ekzekutohet ky funct apo event
//socket eshte nje instance e klientit
io.on("connection", (socket) => {


  //callback eshte nje menyre e mire per error handling
  //ose per te thirrur callback kur ky event : "join-from-front"
  socket.on("join", (params, callback) => {

    const { error, user } = addUser({
      id: socket.id,
      name: params.name,
      room: params.room,
    });

    if(error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name} welcome to the room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });
    socket.join(user.room);

    io.to(user.room).emit('roomData',{ room:user.room,users: getUserInRoom(user.room) })

    callback();
  });

  socket.on("sendMessage", (message, callback) => {

    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    //pasi mesazhi cohet ne front therrasim kete
    callback();
  });

  //kur te shkeputet lidhje do ekzek ky funk apo event
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if(user){
      console.log("user----disconected---",user)
      io.to(user.room).emit("message",{user:"admin",text:`${user.name} has left`});
      io.to(user.room).emit("roomData", { room:user.room,users: getUserInRoom(user.room)});
    }
  });
});

server.listen(port, () => {
  console.log("server is running on port".yellow, port);
});
