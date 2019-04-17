const express = require('express')

const userRouter = require('./user')


const app = express()
app.use('/user',userRouter) // 只要路由前缀是/user 就会去userRouter中查找子路由

// app.get('/',function(req,res) {
//     res.send('<h1>hello</h1>');
// })

app.listen(9093,function() {
    console.log('now app start at port 9093')
})