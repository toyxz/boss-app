const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')


const app = express()
app.use(cookieParser())
app.use(bodyParser.json())


app.use('/user',userRouter) // 只要路由前缀是/user 就会去userRouter中查找子路由


app.listen(9093,function() {
    console.log('now app start at port 9093')
})