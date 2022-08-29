const socket = {}
const socketio = require('socket.io')


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
    console.log('socket',socket.id);
    //登录时建立一个username到socketID的映射表
    socket.on('login',username=>{
      socketHandler.saveUserSocketId(username,socketID)
    })

    socket.on('message', (data) => {
      console.log('aaaaa', data)
      // Idtoid.findOne({
      //   username:data.receiveName
      // }).then(rs=>{
      //   console.log(rs)
      // })
      socket.emit('message', data)
    })

  })

  return io
}

socket.getSocket = getSocket;
//导出socket
module.exports = socket