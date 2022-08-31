const socket = {}
const socketio = require('socket.io')


let userList = {}

function getSocket (server) {
  const io = socketio(server, {
    cors: true,
    maxHttpBufferSize: 3 * 1024 * 1024,
  })

  io.on('connection', async socket => {
    // let timestamps = new Date().getTime() //获取时间
    console.log('连接成功')
    // console.log('io.sockets.sockets',io.sockets.sockets) //可以看到当前在线人数
    const socketID = socket.id
    // console.log('socket', socket.id);

    socket.on('login', user => {
      // userList=Object.assign(userList,user.username,user)
      userList[user.username] = user
      io.emit('userList',user)
      console.log('userList',userList)
    })

    socket.on('message', (data) => {
      console.log('aaaaa', data)  
      io.emit('message', data)
    })

    socket.on('disconnect', () => {
      console.log('断开连接',socket.id)
      io.emit('logout', socket.id)
    })

  })

  return io
}

socket.getSocket = getSocket;
//导出socket
module.exports = socket