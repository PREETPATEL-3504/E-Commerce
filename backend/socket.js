const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const con = require("./db");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  const query = "UPDATE users SET socketId = null WHERE socketId = ?";
  socket.on("disconnect", () => {
    con.query(query, [socket.id], function (err, result) {
      if (err) throw err;
      console.log("User disconnected: ", socket.id);
    });
  });
});

module.exports = { app, io, server };
