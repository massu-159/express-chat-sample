const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  
  // ユーザーが送ったメッセージをサーバーが受け取る
  socket.on("chat message", (msg) => {
    // サーバーで受け取ったメッセージをユーザーに表示
    io.emit("chat message", msg);
  })
})

server.listen(PORT, () => {
  console.log("listening on 3000");
});