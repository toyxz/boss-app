const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
// work with express  使得socket.io和express成功绑定起来
const server = require('http').Server(app)
const io = require('socket.io')(server)
const userRouter = require('./user')

io.on('connection',function(socket) {
    console.log('user lofin')
    socket.on('sendmsg',(data) => {
        // console.log(data)
        // io.emit('receivemsg',data)
    })
    // socket.on('disconnect', function () {
    //     io.close()
    //     console.log('guanle')
    //   });
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter) // 只要路由前缀是/user 就会去userRouter中查找子路由

server.listen(9093,function() {
    console.log('now app start at port 9093')
})