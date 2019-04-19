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


---- 19号晚上看到 8.2 后面的话 再看。。。 有面试了 好好准备一天！




















question
* 很多变量都是存储在 store 中，是不是后面需要用到呢？?