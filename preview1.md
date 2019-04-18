> 关于登录注册，以及对react的使用做一个 **preview**


#### server 文件夹
| 文件 | 使用到的模块（及其功能） | 主要作用 | API |
| ------ | ------ | ------ | ----- |
| model.js | mongoose | 链接mongo、定义模型对象、创建mongoose对象模型 | 对外暴露getMOdel函数 来 获取对应模型对象 |
|server.js|bodyParser、cookieParser|创建服务器、使用中间件、定义路由处理、监听|主要用来处理路由|
|user.js  |   express、utility(处理加密算法的工具)、获取User模型|处理登录注册功能  | get/list 、post/login 、post/register、get/info| 
|  |  |  |  |

##### src文件夹
##### component
| 文件夹 | 文件 | 主要功能 | 引入的模块 |
| --- | --- | -- | -- |
| authrouter | authrouter.js | 主要定义一个组件，这个组件不是路由组件，而是参与信息获取，```用于鉴权```，该组件放在index.js中。起到组件节点 mount 之前 的 ```用户信息```，判断是否该跳转路由 |react、axios、react-router-dom的withRouter（解除 非路由组件无法获取路由信息/方法 的限制）、loadData(更新state的一个action)、connect(可以将store的state信息和方法 注入 ```props```中)|
|logo|logo.js[css]|一个存放logo图片的组件（可以复用）|无|
|  |  |  |  |

##### comtainer
|文件夹|文件名|主要功能|引入的模块|
| --- | --- | --- | --- |
| login | login.js | ```登录组件```（路由组件）|react-redux、react-router-dom|
|register | register.js | ```注册组件```(路由组件)|react-router-dom(提供路由/组件方法)、react-redux、user.redux.js中的 register
|redux|user.redux.js| ```状态库（action creator、action、diapatch）```|  axios
|  |  |  |  |
#### 核心组件的具体实现
```Login```
* 引入对应的UI
* 引入```react-router-dom'```中的 Redirect 来 做跳转功能
* 与 login 有关的redux 
* 引入 ```react-redux```的 connect
    * connect 是一种装饰器的写法，connect()返回值是Connect组件。```通俗点理解，使用connect可以把state和dispatch绑定到react组件，使得组件可以访问到redux的数据```
* 改组件主要是调用 connect 过来的 dispatch 来更改state数据
    * 现该组件 使用 login 这个dispatch 来 发送请求，如果请求成功再更新 相应 的状态

```Register```
* 和Login功能相似，只不过多了 重复密码 
* 引入 ```react-redux```的 connect
* 引入对应的UI


### React的使用
这一块功能使用的过程中，主要是 
* react的基本用法
    * 一个js文件一个组件
    * 引入 store
    * 非路由组件无法获取路由信息，可以通过```react-router-dom```的withRouter
* redux 的 用法 （react-redux）
     * 为了 react 方便使用 redux 引入 ```react-redux```,该模块只提供```Provider和connect```这两个API
        * Provider是顶层组件的作用，将store作为上下文提供给全局共享
        * Connect组件是局部组件，将某个react组件包装起来，传递指定的state和props给该组件访问
* react-router-dom
    * 主要暴露 Redirect、Route、BrowserRouter
* 一些 好玩的 tips
    * @connect 装饰器：使用connect可以把state和dispatch绑定到react组件，使得组件可以访问到redux的数据
    * withRouter 可以 使得 非路由组件 获取路由信息

