
// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { charuser } from './redux/chatuser.redux'


export default combineReducers({ user,charuser })

