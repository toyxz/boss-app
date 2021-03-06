import React from 'react'
import axios from 'axios'
import '../../config'
import {withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux';

@withRouter
@connect(
    null,
    { loadData }    
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['./login','register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        } 
        // 获取用户信息
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        // 有登录信息的
                        this.props.loadData(res.data.data)
                    } else {
                        // 由于该组件不是一个路由组件，所以打印 this.props.history 会显示 undefined
                        // 所以引入 react-router-dom 的 withRouter 来过
						this.props.history.push('/login')
                    }
                    console.log(res.data)
                }
            })
        // 是否登录
        // 现在的url 地址 login是不需要跳转的

        // 用户的type 身份是boss还是牛人
        // 用户是否完善信息 （选择头像 个人简介）
    }
    render() {
        return null
    }
}
export default AuthRoute