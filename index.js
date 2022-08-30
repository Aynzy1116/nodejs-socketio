const express = require('express')
const http = require('http')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// var http = require('http').Server(app);

// app.get('/list', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

const PORT = process.abort.PORT || 3001

//创建HTTP server
const server = http.createServer(app);
const socket = require("./src/websocket/socketio")
process.io = socket.getSocket(server); //使用http协议建立socket
//此处变成http listen
server.listen(3010);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})