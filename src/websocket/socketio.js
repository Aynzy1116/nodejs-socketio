const socket = {}
const socketio = require('socket.io')


function getSocket (server) {
  const io = socketio(server, {
    cors: true,
    maxHttpBufferSize: 3 * 1024 * 1024,
  })

  io.on('connection', async socket => {
    let timestamps = new Date().getTime()
    console.log('连接成功')

    socket.on('message', (data) => {
      console.log('aaaaa', data)
      socket.emit('message', data)
    })

  })

  return io
}

socket.getSocket = getSocket;
//导出socket
module.exports = socket