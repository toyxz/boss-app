import React from 'react'

import Logo from '../../component/logo/logo'
import {List ,InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Login extends React.Component{
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }
    register() {
        // 由于这个是一个路由组件，所以它的 props 中有相关的路由操作内容
        this.props.history.push('/register')
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <h2>我是登陆</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                    <Button type="primary">登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login