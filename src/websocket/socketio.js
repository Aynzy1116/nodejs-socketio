const socket = {}
const socketio = require('socket.io')


const userList = {}

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
    console.log('userList',userList)

    socket.on('login', user => {
      userList[user.id] = socketID
      io.emit('userList',user)
      console.log('userList',userList)
    })

    socket.on('message', (data) => {
      console.log('data',data)
      console.log('list',userList)
      console.log('userList',userList[data.to_Id])
      console.log('aaaaa', data)  
      io.to(userList[data.to_Id]).emit('message', data)
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