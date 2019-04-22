#### 坑
如果
```js
    onClick={()=>{
        this.props.update(this.state)
    }}
```
写成
```js
    onClick={this.props.update(this.state)}
```

```prop-types```
属性类型检查，之前是内置在react中的，而react16之后就分离开了
开发过程中进行强类型校验
可以避免很多错误


像下面这个组件一样，如果没有加Switch 那么 一定会匹配到Dashboard，那么 如果我反问login那些路由组件的时候，如果 组件 Dashboard 收到
```
    <Switch>
        <Route path='/bossinfo' component={BossInfo}></Route>
        <Route path='/geniusinfo' component={GeniusInfo}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route component={Dashboard}></Route>
    </Switch>
```

就会导致这个函数的触发，而且发现 被绑定 的对应组件会被重复渲染三次


















 browser-cookies   操作cookie的一个库


组件的坑？TabBar这个组件 居然 设置了 height：100% （TabBar挡住了其他组件，所以点击无效）导致我在页面中其他组件无法响应事件，然后就对这个组件对应的class设置一个样式：height:auto 这样就可以不遮挡到其他组件 达到响应的效果了。
也可以 设置   z-index: -1;  来解决


question
* 很多变量都是存储在 store 中，是不是后面需要用到呢？?

我搞不懂 为什么会渲染多次。。。


遇到一个问题 现在一直还没有解决，花了快半个小时了，先继续走下去，看等会有没有解决方案。
问题是 推出登录 之后本来会重定向到login 但是 由于这个时候 会重新渲染DashBoard 那么 DashBoard这个组件就会 重新渲染（我确实看到它重新渲染了） 重新渲染就会导致 jsx
中的路由匹配不到当前的pathname 也就没有所谓的title属性 此时就会报错
本来想给外层包一下 三目运算符 发现还是行 会发生同样的错误
视频后面的解决方案 ：``` {(this.props.redirectTo&&this.props.redirectTo!='/login')? <Redirect to={this.props.redirectTo} />:null}```我总感觉这个渲染机制是有关系的。是不是因为本来已经跳转到login了 但是login组件中又有这么个跳转逻辑 所以可能会跳转，react 避免```死循环```就抛出错误。。。还是得好好理解一下新版React！！

### 如何用高阶组件来优化
#### 函数式编程
React 高阶组件HOC 把一个组件传入，返回一个新的组件，以@符号开头，虽然使用是一样的，但是内部却已经发生了翻天覆地的变化
```js
    function hello() {
        console.log('hello imooc i love React')
    }
    function WrapperHello(fn) {
        return function() {
            console.log('before say hello')
            fn()
            console.log('after say hello')
        }
    }
    hello = WrapperHello(hello)
```
所有的组件本质上都是一个函数
```js
class Hello extends React.Component{
    render() {
        return <h2>hello imooc i love React&redux </h2>
    }
}

function WrapperHello(Comp) {
    class WrapComp extends React.Component{
        render() {
            return ( <div>
                <p>这是HOC高阶组件特有的元素</p>
                <Comp>{...this.props}</Comp>
            </div> )
        }
    }
    return WrapComp
}
Hello = WrapperHello(Hello)

// 也可以在 Hello 组件上 写一个@

// 可以在原来的组件上进行增强

// HOC  ： High Order Component 高阶组件
// 有两种功能的高阶组件
    // 属性代理  （上面的代码）
    // 反向继承


// 反向继承
// 可以增加一些生命周期
function WrapperHello(Comp) {
    class WrapComp extends React.Component{
        componentDidMount() {
            console.log('高阶组件新增的生命周期，加载完成)
        }
        render() {
            return 
                <Comp></Comp>
        }
    }
}
```



------socket io 开始
### socket.io
* 是基于事件的实时双向通信库
    * 基于websocket协议
    * 前后端通过事件进行双向通信
    * 配合express，快速开发实时应用
* socket.io和ajax的区别

基于不同的网络协议
* Ajax 基于http协议，单向，实时获取数据只能```轮询```
    * 轮询 不停 查询
    * long puning 跟轮询类似，只不过不是一次一次发起请求，而是发起一次长连接，之后后端不返回，就挂起，有返回就处理数据然后再发起一次请求
* socket.io 给予websocket双向通信协议，后端可以主动推送数据
* ```现代浏览器均支持websocket协议```
#### socket通信模型
#### socket.io后端的API
配合express
* io = require('socket.io')(http)
io.on 监听事件
io.emit 触发事件
#### socket.io 前端API
前端socket也是配合express 是因为前端页面的渲染也是跟后端有关
配合express
* import io from 'socket.io-client'
* io.on 监听事件
* io.emit 触发事件

-----

在做实时聊天的时候，只要用了两个登录，服务器就会cpu飙升，而且发现好像还多开了一个node进程     
为什么，这样我也不能测试啊。。。而且，这完全有问题

而且就算只开一个，node的cpu占的也非常高，我怀疑就是代码的问题  socket 那块。 快百分之百了

然后发现视频的代码 有问题， 他把 socket 链接放在 componentDidMount  这样 我无论在哪个路由下只要一刷新就会渲染 就直接建立了 socket 链接 。
实际上应该是

在调试的过程中发现一个问题 只要一开始的话 页面一渲染就会发送网络请求，这样的话一旦服务端出了问题。这边要调试就很麻烦，老是要开关服务
而且每次刷新完 控件都是失效的  是js被阻塞了嘛？被socket阻塞了？？

我本来和服务器已经建立了 socket 链接 但是由于由于客户端代码修改之后重新刷新 此时就会 ------  这个bug还没有解决。。。
本来想用 componentWillUnmount 来解决这个 问题 但是最后发现也不是能行得通

聊天的信息 连表查询 在mongo中叫做 population