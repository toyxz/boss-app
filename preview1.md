> 关于登录注册，以及对react的使用做一个 **preview**


#### server 文件夹
| 文件 | 使用到的模块（及其功能） | 主要作用 | API |
| ------ | ------ | ------ | ----- |
| model.js | mongoose | 链接mongo、定义模型对象、创建mongoose对象模型 | 对外暴露getMOdel函数 来 获取对应模型对象 |
|server.js|bodyParser、cookieParser|创建服务器、使用中间件、定义路由处理、监听|主要用来处理路由|
|user.js  |   express、utility(处理加密算法的工具)、获取User模型|处理登录注册功能  | get/list 、post/login 、post/register、get/info| 

##### src文件夹
##### component
| 文件夹 | 文件 | 主要功能 | 引入的模块 |
| --- | --- | -- | -- |
| authrouter | authrouter.js | 主要定义一个组件，这个组件不是路由组件，而是参与信息获取，```用于鉴权```，该组件放在index.js中。起到组件节点 mount 之前 的 ```用户信息```，判断是否该跳转路由 |react、axios、react-router-dom的withRouter（解除 非路由组件无法获取路由信息/方法 的限制）、loadData(更新state的一个action)、connect(可以将store的state信息和方法 注入 ```props```中)|
|logo|logo.js[css]|一个存放logo图片的组件（可以复用）|无|

##### comtainer
|文件夹|文件名|主要功能|引入的模块|
| --- | --- | --- | --- |
| login | login.js | ```登录组件```（路由组件）|react-redux、react-router-dom|
|register | register.js | 

#### 核心组件的具体实现
```Login```
* 引入对应的UI
* 引入```react-router-dom'```中的 Redirect 来 做跳转功能
* 与 login 有关的redux 
* 引入 ```react-redux```的 connect
    * connect 的功能主要是


### React的使用
这一块功能使用的过程中，主要是 
* react的基本用法
* redux 的 用法
* react-router
* 一些 好玩的 tips

