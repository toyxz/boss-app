const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')
const app = express()
// work with express  使得socket.io和express成功绑定起来
const server = require('http').Server(app)
const io = require('socket.io')(server)
const userRouter = require('./user')

io.on('connection',function(socket) {
    console.log('user lofin')
    socket.on('sendmsg',(data) => {
        console.log(data)
        console.log('???')
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')   // 这样每对用户之间的聊天就会有唯一的id
        Chat.create({chatid,from,to,content:msg},function(err,doc) {
            io.emit('receivemsg',Object.assign({},doc._doc))
        })
        console.log(data) 
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
app.use(function(req,res,next){
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    } 
    // return res.sendFile(path.resolve(__dirname,'../build/index.html'))
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function() { 
    console.log('now app start at port 9093')
})