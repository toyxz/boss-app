## 聊天模块
#### 数据库模型处理
字段如下：
```js
'chatid'———— 不同的人聊天之间都会有一个聊天id（为了唯一且方便设置，将from和to字段排序后以_连接）
'from'———— 发出信息的人的id
'to'————发信息给别人的那个人的id
'read'————标志这段信息是否已读
'content'————信息内容
'create_time'————为了获得双方聊天的最近的信息的时间，以便将信息 置顶
```
#### redux如何存储状态
主要有几个reducer
```js
// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标示已读
const MSG_READ = 'MSG_READ'
```
设置一个state
```js
const initState = {
    chatmsg: [],    // 双方的聊天列表
    users:{},       // （后台的接口是拿到所有人）
    unread: 0       // 未读的信息（注意不是双方的信息，而是登录的一方的未读的信息）
}
```

#### 聊天通信
```js
// server.js
io.on('connection',function(socket) {
    socket.on('sendmsg',(data) => {
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')// 这样每对用户之间的聊天就会有唯一的id
        Chat.create({chatid,from,to,content:msg},function(err,doc) {
            io.emit('receivemsg',Object.assign({},doc._doc))
        })
        // 通知客户端进行响应的状态更新
    })
})
```
#### 未读消息处理
利用mongodb 调用update API会返回一个带有 nModified 的属性的对象，这代表我们修改了多少条已读的数据，那么就将当前用户store中的未读数量减去nModified即可

#### 实现最近发送的消息置顶
```js
首先根据chatid对信息进行分组，拿到各组最后一条聊天记录和聊天时间，将该聊天信息显示，将该聊天时间进行排序并且去最大的那个create_time
```

还有一个小bug还没修。。