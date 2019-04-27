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

然后发代码 有问题， 把 socket 链接放在 componentDidMount ？？ 这样 我无论在哪个路由下只要一刷新就会渲染 就直接建立了 socket 链接 。
实际上应该是

在调试的过程中发现一个问题 只要一开始的话 页面一渲染就会发送网络请求，这样的话一旦服务端出了问题。这边要调试就很麻烦，老是要开关服务
而且每次刷新完 控件都是失效的  是js被阻塞了嘛？被socket阻塞了？？

我本来和服务器已经建立了 socket 链接 但是由于由于客户端代码修改之后重新刷新 此时就会 ------  这个bug还没有解决。。。
本来想用 componentWillUnmount 来解决这个 问题 但是最后发现也不是能行得通

这个通信老是 有毛病 ，包括 前端 刷新一次之后 要么请求不到信息 要么控件失去响应（这部分我怀疑还是服务端的问题，导致部分css文件没有送达。。）

聊天的信息 连表查询 在mongo中叫做 population

又发现了一个问题，这个问题好像可以让我明白为什么前面总是出现bug，   ```websocket.js:203 WebSocket is already in CLOSING or CLOSED state.  ```发现有一段时间没有和服务器交互的话就会出现 websocket关闭，这样的话不仅本端无法正常访问服务器 其他用户也无法访问服务器。。。。这个问题估计要到后面才能解决，一下子成功一下子失败？？

为什么在切换联系人的时候，发送消息会渲染多条？
```js
// 这是由于每次切换的时候会执行到 componentDidMount 就会重新获取，把这个获取信息的代码 放在 if 语句中即可
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMegList()
            this.props.recvmsg()
        }
    }
```


实现了 最新收到的信息要排在前面 就像qq和微信

### React 进阶
* React原理
* Redux原理
* React + Redux 常见性能优化机制

#### React原理
Babel官网可以看JSX转换后的代码，例如：
```js
<h2>hello imooc I love React&Redux</h2>
```
会编译为:
```js
React.createElement(
    "h2",
    null,
    "hello imooc I love React&Redux"
)
```
这样react就可以将我们写的JSX代码以js的形式存储到```内存```中


对比虚拟树，达到最小化修改DOM的效果（原因：树的递归对比复杂度非常高，```所以其实内部是进行平级对比的），这也是为什么React中国呢要避免跨DOM层级去操作数据```,react虚拟处理机制是无法对这种情况进行优化的。

当我们增加一个dom元素的时候，就要考虑这个dom元素应该放置在哪个位置，通过```移动、删除和添加元素```的方式 让老的元素拼合成一个新的元素
> createElement的机制
```html
<h2 data-id='imooc' style='color:red'>
<p data-name='react rocks'>hello inooc</p>
</h2>
```
解析出来的代码：
```js
React.createElement(
    'h2',
    {'data-id':'imooc','style':'color:red'},
    React.createElement(
        'p',
        {'data-name':'react rocks'},
        'hello inooc'
    )
)
```
createElement的源码
```js
// createElement
ReactElement.createElement = function(type,config,children) {
    var propName
    // Reserved  names are extracted
    var props = {}
    var key = null
    var ref = null
    var self = null
    var source = null
    // ...省略代码
    return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props
    )
}
// ReactElement
var ReactElement = function (type,key,ref,self,source,owner,props) {
    // 一个元素由一个对象来描述
    // 最后 jsx 就会以递归的形式存在于我们的内存中
    var element = {
        $$typeof:REACT_ELEMENT_TYPE,
        type:type,
        key:key,
        ref:ref,
        props:props,
        _owner:owner
    }
}
// 将新对象和旧对象进行diff运算，达到最小操作页面的效果
// react拿到 js对象之后就会执行 undateChildren函数 来 打patch
```
#### 声明周期
```             
                            父组件render
 Intial render                  |
     |                          |
     |                          |
     |                 componentWillReceiveProps()
constructor()                   |
     |                          |
     |                  shouldComponentUpdate()<-this.setState()
     |                          |
componentWillMount()            |
     |                      componentWillUpdate()
     |                          |
     |                          |
     -----------------------render()---------
     |                                      |
     |                                      |
     |                                      |
componentDidMount()                     componentDidUpdate                       
     |                                      |
     |                                      |
     |--------------------------------------|
```
this.setState()更新状态，会调用```shouldComponentUpdate```这个函数，只有这个函数```返回true才能继续执行一以下的生命周期```，也就是说才会更新，这意味着我们在shouldComponentUpdate可以定制生命周期中的执行流向

this.forceUpdate()不管前面怎么定制，都会往下执行

定制 shouldComponentUpdate 可以做 性能优化

this.setState有一种队列的机制，通过队列来更新，每次调用setState都会将数据更新放入setState的队列中，达到高效更新的效果，然后执行render。```setState是异步的```

注意！一定不能在render()中执行setState,会导致死循环，除非自己定制了shouldComponentUpdate，可以在某种情况下跳出循环


#### Redux
几个概念：
* createStore  只有这个api对外暴露了
* getState
* subscribe
* dispatch
```js
// 简单的 发布订阅机制
export function createStore(reducer) {
    let currentState = {}
    let currentListeners = []
    function getState() {
        return currentState
    }
    function subscribe(listener) {
        // 简易版不考虑细节 主要实现主要逻辑
        currentListeners.push(listener)
    }
    function dispatch(action) {
        currentState = reducer(currentState,action)
        currentListeners.forEach(=>v())
        return action
    }
    // 由于有初始状态，所以一开始需要手动dispatch一下
    // 一开始的状态需要比较特殊，避免和用户定义相同
    dispatch({type:'@YAOZUZHEN'})

    return {getState,subscribe,dispatch}
}
```
#### React-Redux
* connect
* provider provider

connect 本质上就是一个函数
```js
App = connect(
    state => ({num:state}),
    {addGun,removeGun,addGunAsync}
)(App)
```

```js
import React from 'react'
import PropTypes from 'props-types'
import {bindActionCreators} from '../util'
// connect 负责链接组件，给到redux的数据放到组件的属性里面
// 1、负责接收一个组件，把state中的一些数据放进去，返回一个组件
// 2、 数据变化的时候，能够通知组件
export const  connect = (mapStateToProps=state=>state,mapDispatchToProps{}) => (WrapComponent) => {
    return class ConnectComponent extends React.Component{
        static contextTypes = {
            store:PropTypes.object
        }
        cnostructor(props,context) {
            super(props,context)
            this.state = {
                props:{}
            }
        }
        componentDidMount() {
            const {store} = this.context
            // 进行一个订阅。当state更新的时候
            store.subscribe(() => this.update())
            this.update()
        }
        update() {
            // 获取mapStateToProps和mapDispatchToProps
            const {store} = this.context
            const stateProps = mapStateToProps(store.getState())
            // 方法不能直接给 因为需要dispatch 
            const dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch)
            this.setState({
                props: {
                    ...this.state.props,  // 注意这里有位置问题，底下的会把上面的覆盖掉
                    ...stateProps,
                    ...dispatchProps
                }
            })
        }
        render() {
            return <WrapComponent {...this.state.props}></WrapComponent>
        }
    }
}
// provider ,把store放到context里，所有的子元素可以直接取到store
export class Provider extends React.Component{
    static childContextTypes = {
        store:PropTypes.object
    }
    getChildContext() {
        return {store:this.store}
    }
    constructor(props,context) {
        super(props,context)
        this.store = props.store
    }
    render() {
        // Provider 并不渲染 而是渲染它的子元素
        return this.props.children
    }
}
```
工具函数
```js
function bindActionCreator(creator,dispatch) {
    return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(creators,dispatch) {
    let bound = {}
    Object.keys(creators).forEach(v=>{
        let creator = creators[v]
        bound[v] = bindActionCreator(creator,dispatch)
    })
    return bound
    // 另一种写法
    return  Object.keys(creators).reduce((ret,item) => {
        ret[item] = bindActionCreator(creator[item],dispatch)
        return ret
    },{})
}
```


##### context 是全局的，组件里声明，所有子元素可以直接获取
```js
getChildContext() {
    return this.state
}
//  那么在多级子元素中不需要传递，只需要在需要用的那么子组件中使用 this.context.xx 获取即可
// 在父组件中：
static childContextTypes = {
    user:PropTypes.string
}
// 子组件中使用：
static contextTypes = {
    user:PropTypes.string
}
// 注意，定义了context，那么是必传的，用 prop-types
```
> 实现无状态组件

```js
function Narbar(props,context) {}
```
 

 react-redux 主要暴露两个接口 provider、connect

 provider把传递进来的props放在全局的context中，这样provider中所有的子组件都可以直接通过context获取属性，这样属性就不用一层一层传了。  

 connect 是一个高阶组件，是接收参数的，mapStateToProps ，mapDispatchToProps 

 #### 中间件
 所谓的中间件就是在我们的 内核 外面包了一层又一层的中间件

 applyMiddleware(thunk)

 在createStore中进行修改
 ```js
 export function createStore(reducer,enhancer) {
     if (enhancer) {
         return enhancer(createStore)(reducer)
     }
     // ...
 }
 ```
 ```js
 // xxx.react-redux
 // 模拟react-redux 中间件
 export function addMiddleWare(middleware) {
     return createStore=>(...args)=>{
         // 原生的store
         const store = createStore(...args) 
         const dispatch = store.dispatch
         // addMiddleWare 三层返回
         const midApi = {
             getState:store.getStore,
             // 对原生的 dispatch 进行扩展
             dispatch:(...args)=>dispatch(...args)
         }
         const middlewareChain = middlewares.map(middleware => middleware(midApi))
         dispatch = middleware(midApi)(store.dispatch)
         return {
             ...store,
             dispatch
         }
     }
 }
 ```
 ```js
 // thunk 中间件
 const thunk = ({dispatch,getState}) => next => action => {
     if (typeof action=='function') {
         return action(dispatch,getState)
     }
     // 默认，什么都没干
     return next(action)
 }
 export default thunk
 ```
 多个中间件合并
 ```js
  // 模拟react-redux 中间件
 export function addMiddleWare(...middlewares) {
     return createStore=>(...args)=>{
         // 原生的store
         const store = createStore(...args) 
         const dispatch = store.dispatch
         // addMiddleWare 三层返回
         const midApi = {
             getState:store.getStore,
             // 对原生的 dispatch 进行扩展
             dispatch:(...args)=>dispatch(...args)
         }
         dispatch = compose(...middlewareChain)(store.dispatch)
        //  dispatch = middleware(midApi)(store.dispatch)
         return {
             ...store,
             dispatch
         }
     }
 }
 ```
```js
expose function compose(...funcs) {
    if (funcs.length == 0) {
        return arg=>arg
    }
    if (funcs.length == 1) {
        return funcs[0]
    }
    return funcs.reduce((ret,item) => (...args) => ret(item(...args)))
    // reduce 非常适合用于累加、累计调用等功能

}
``` 
#### 定制arrayThunk
使用
```js
// 调用
export function addTwice() {
    return [{type:ADD_GUN},{type:ADD_GUN}]
}
// ...调用
createStore(count,applyMiddleware(thunk,arrThunk))
```
arrayThunk---支持数组的中间件
```js
const arrayThunk = ({dispatch,getState}) => next => action => {
    if (Array.isArrray(action)) {
        return action.forEach(v=>dispatch(V))
    }
    // 如果不符合我们的要求，直接调用下一个中间件，使用next
    // 如果复合我们的要求，需要重新dispatch，调用dispatch即可
    return next(action)
}
```
#### 总结如下
迷你redux源码
```js
export function createStore(reducer,enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }
    let currentState = {}
    let currentListeners = []
    function getState() {
        return currentState
    }
    function subscribe(listener) {
        // 简易版不考虑细节 主要实现主要逻辑
        currentListeners.push(listener)
    }
    function dispatch(action) {
        currentState = reducer(currentState,action)
        currentListeners.forEach(=>v())
        return action
    }
    // 由于有初始状态，所以一开始需要手动dispatch一下
    // 一开始的状态需要比较特殊，避免和用户定义相同
    dispatch({type:'@YAOZUZHEN'})

    return {getState,subscribe,dispatch}
}
// reducer 是对state做不同的修改
// 以一个object的形式把三个函数 export 出去
```
迷你react-redux源码
```js
import React from 'react'
import PropTypes from 'props-types'
import {bindActionCreators} from '../util'
// connect 负责链接组件，给到redux的数据放到组件的属性里面
// 1、负责接收一个组件，把state中的一些数据放进去，返回一个组件
// 2、 数据变化的时候，能够通知组件
export const  connect = (mapStateToProps=state=>state,mapDispatchToProps{}) => (WrapComponent) => {
    return class ConnectComponent extends React.Component{
        static contextTypes = {
            store:PropTypes.object
        }
        cnostructor(props,context) {
            super(props,context)
            this.state = {
                props:{}
            }
        }
        componentDidMount() {
            const {store} = this.context
            // 进行一个订阅。当state更新的时候
            store.subscribe(() => this.update())
            this.update()
        }
        update() {
            // 获取mapStateToProps和mapDispatchToProps
            const {store} = this.context
            const stateProps = mapStateToProps(store.getState())
            // 方法不能直接给 因为需要dispatch 
            const dispatchProps = bindActionCreators(mapDispatchToProps,store.dispatch)
            this.setState({
                props: {
                    ...this.state.props,  // 注意这里有位置问题，底下的会把上面的覆盖掉
                    ...stateProps,
                    ...dispatchProps
                }
            })
        }
        render() {
            return <WrapComponent {...this.state.props}></WrapComponent>
        }
    }
}
// provider ,把store放到context里，所有的子元素可以直接取到store
export class Provider extends React.Component{
    static childContextTypes = {
        store:PropTypes.object
    }
    getChildContext() {
        return {store:this.store}
    }
    constructor(props,context) {
        super(props,context)
        this.store = props.store
    }
    render() {
        // Provider 并不渲染 而是渲染它的子元素
        return this.props.children
    }
}
// provider 拿到store，把这个store 放到context中，保证provider中所有的子元素都可以取到当前的store

// connect是一个高阶函数 ，第一层接收两个参数（需要的属性和操作方法）
// 从当前的store中获取状态，决定那些参数放到prop里面，接着使用bindActionCreators把本身传入的参数/对象包装成可以diapatch的函数
```
applyMiddleware中间件把每个传入的中间件收集到一个数组中，把这个数组进行遍历，给这个数组传递dispatch，返回用中间件处理过的dispatch覆盖原来的dispatch。和applyMiddleware关联的是compose，这个compose其实就是函数的多层调用

迷你redux-thunk
>写任何redux中间件都要写是三个箭头

-------------------------- 前面的内容需要进一步处理
## React 性能优化
#### React 组件优化
* 属性传递优化
* 多组件优化
* key

```1、bind的优化```
下面这两种写法都会有一定的性能瓶颈
```js
<button obClick={this.handleClick.bind(this)}>btn1</button> // 1
<button obClick={()=>this.handleClick()}>btn2</button> // 2
```
1 处每次render的时候都会bind一次

2 比 1 性能稍微好一点，但是每次render处会返回一个新的function，占据存储空间
 
比较推荐的写法是在contructor里面bind一下，这样只会执行一次
```js
constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
}
```
```2、传值的优化```
* 不要传递额外的参数
* 尽量提取参数，避免占据过多存储空间,如
```js
render() {
    const item = 'test'
    return (
        <div>
            <Demo name={item}></Demo>
        </div>
    )
}

<Demo name={title}></Demo>
```
## 定制shouldComponent
如果传递给子组件的值在父组件中变更后也就是使用了setState之后，从生命周期的那个图中可以看到，会执行shouldComponent然后继续往下走的话就会触发整个子组件的重新渲染
#### 怎么查看一个性能的指标
可以用浏览器控制面板的performance查看每一截断渲染的时间
#### shouldComponent这个生命周期是决定我们是不是要渲染的
```js
shouldComponentUpdate(nextProps,nextState) {
    if (nextProps.title == this.perops.title) {
        return false
    }
    return true
}
```
@pure-render
  extends React.PureComponent 
大部分情况下可以使用PureComponent 

#### 两个值的深比较
```js
function compareObj(obj1,obj2) {
    if (obj1 == obj2) {
        return true
    }
    if (Object.keys(obj1).length!==Object.keys(obj2).length) {
        return false
    }
    for (let k in obj1) {
        if (typeof obj1[k] == 'object') {
            if (compareObj(obj1[k],obj2[k])) {
                continue;
            } else {
                return false
            }
        }
    }
    return true
}
```
但是每次都在shouldComponent进行一次深比较这样的递归对比，性能不可接受

react建议，制作浅层对比，包括pureComponent都是浅对比，这也是建议数据结构不要嵌套阔身而造成性能隐患或者无法更新

####
为了解决上面的问题,可以用facebook在2014年推出的```immutable.js```的库，作用在于如何在js中引出一个不可变的对象。（不可变的对象可以```节省内存```，降低可变的复杂度；还可以做```并发安全```，做函数式变化）
```js
import {Map} from 'immutable'
let obj = Map({
    'name':'imooc',
    'course':Map({name:'react+redux'})
})
let obj1 = obj.set('name','woniu')
console.log(obj.get('course') == obj1.get('course'))
console.log(obj==obj1)

```
```js
import {Map,is} from 'immutable'
let obj = Map({
    'name':'imooc',
    'course':Map({name:'react+redux'})
})
```
那么可以在state中使用this.state = Map({...})
使用的时候 this.setState(this.state.get('imooc'))
```
immulatable优点
1、减少内存使用
2、并发安全
3、降级项目复杂度
4、便于比较复杂数据，定制shouldComponentUpdate方便
5、时间履行功能方便
6、函数式编程
缺点
1、学习成本
2、库的大小
3、对现有项目入侵严重，
    新项目使用，老项目评估再用
```
#### redux如何做性能优化
reselect这个库内部会做缓存计算，性能优化

其实就是将数据进行缓存，减少重复计算

#### key的使用
虚拟dom的优化过程需要key，而且key不能用索引值来生成，否则一旦索引值发生改变，就会认为后面的元素全部发生了改变就会重新渲染。


## eslint代码规范
```js
// 可以关掉部分报错
exlintCongif: {
    // ...
    "rules" : {
        "eqeqeq":["off"]
    }
}
```
代码开头是[(+!- 这种，在前面加上;就可以解决所有不加分号的bug，现在js的压缩器都是编译器了，不会导致没有分号不压缩的问题

airbnb 代码规范（github）

## async await优化异步代码


## 异步代码如何调试
```js
async (dispatch,getState) => {
    const res = await axios.post('/user/readmsg',{from})
    const userid = getState().user._id
    // ...
}
```

## 动画解决方案
css动画开启硬件加速，可能渲染更强
javascript动画定制更强一点

* ReactCSSTransitionGroup
* Ant Motion

### 项目打包编译
npm run build
* 编译打包后，生成build目录
* express中间件，拦截路由，手动渲染index.html
* build设置为静态资源地址
```js
app.use(function(req,res,next){
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next()
    } 
    return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
```
```
上线
1、购买域名
2、DNS解析到你服务器的IP
3、安装nginx
4、使用 pm2 管理node进程
```

## React服务端渲染SSR实战
* node环境使用babel-node支持jsx
```js
// package.json
"script":{
    // ...
    "server":"NODE_ENV=test nodemon --exec babel-node server/server.json"
}
```
为了使后端支持jsx，还需要写babel的配置文件
```js
// .babelrc
// 这里补充上package.json中对应的那段bebel配置
```
之后在server端就可以支持jsx语法了

react官网有ssr的demo，主要是```renderToString()```和```renderToStaticMarkup```这两个API
```js
import {renderToString,renderToStaticMarkup} from 'react-dom/server'
// react组件 --> div
function App() {
    return (
        <div>
            <p>hello </p>
        </div>
    )
}
console.log(renderToString(<App></App>))
``` 
到底怎么实现一个服务端渲染呢？

1、挑取公共组件为一个文件

2、服务端import这个文件，加上渲染的API

3、用csshook和assethook分别处理css和图片

依赖骨架 
```js
// server.js
import staticPath from '../build/asset-mainfest.json'
// 注意 hook要放在组件之前
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
assethook({
    extensions:['png']
})
// ，，，
const store = createStore(reducers,compose(
    applyMiddleware(thunk)
))
let context = {}
const markup = renderToString(
    (<Provider store={store}>
        <StaticRouter
            location={req.url}
            context = {context}
        >
            <App></App>
        </StaticRouter>
    </Provider>})
)
// 骨架
const pageHtml =  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <meta name="keyswords" content='React,Redux,Imooc,聊天，SSR'/>
    <meta name="description" content='React,Redux,Imooc,聊天，SSR'/>
    <meta name="author" content='Imooc'/>
    <link rel="stylesheet" href="/${staticPath['main.css']}">
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${makeup}</div>
    <script src="/${staticPath['main.js']}"></script>
  </body>
</html>
`
res.send(pageHtml)
// import 一堆需要的组件
```
## React16新特性
新版本带来的优化和新功能
* 新的核心算法Fiber
    * 渲染一部分，然后将主线程交出来，再渲染一部分，再叫出来。。。
    * 更友好
* Render 可以返回数组，字符串
* 错误处理机制
    * ```js
        constructors(props) {
            super(props)
            this.state = {
                hasError:false
            }
        }
        componentDidCatch(err,info) {
            this.setState({
                hasError:true
            })
        }
        render() {
            return this.state.hasError
            ? <h2>出错啦</h2>
            : <App></App>
        }
        // 或者某个值由于出错的情况下返回图片这样子
      ```
* Portals组件
* 更好更快的服务端渲染
    * 之前版本的renderToString，解析为字符串
    * 新版本的renderToodeStream解析为可读的字节流对象
    * 使用ReactDom.hydate取代render
* 提及更小，MIT协议