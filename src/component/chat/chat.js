import React from 'react'
import {List, InputItem,NavBar,Icon,Grid } from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMegList,sendMsg,recvmsg,readMsg } from '../../redux/chat.redux'
import {getChatId} from '../../util'
const socket = io('ws://localhost:9093')

@connect(
    state => state,
    {getMegList,sendMsg,recvmsg,readMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '',msg:[]}
    }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMegList()
            this.props.recvmsg()
        } 
    }
    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    fixCarousel() {
        // 修复 grid 的 bug ---> 手动
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text:this.state.text})
        // this.setState({
        //     text:''
        // })
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({
            text:'',
            showEmoji:false
        })
    }
    render() {
        const emoji = '❤ 😂 🐻 🐦 👿 🧑 📱 💕 😲 🤔 🔥 ❤ 😂 🐻 🐦 👿 🧑 📱 💕 😲 🤔 🔥 ❤ 😂 🐻 🐦 👿 🧑 📱 💕 😲 🤔 🔥'
                        .split(' ')
                        .filter(v=>v)
                        .map(v=>({text:v}))
        const userid = this.props.match.params.user
        const Item = List.Item 
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        return (
            <div id='chat-page'>
                <NavBar 
                    mode='dark'
                    icon={<Icon type='left'/>}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsg.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from===userid?(
                        <List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item 
                                extra={<img src={avatar}/>}
                                className='chat-me'
                            >{v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:15}}
                                        onClick={() => {
                                            this.setState({showEmoji: !this.state.showEmoji})
                                            this.fixCarousel()
                                        }}
                                    >😲</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>
                        {this.state.showEmoji ? 
                            <Grid 
                            data = {emoji}
                            columnNum={9} 
                            carouselMaxRow = {4}
                            isCarousel={true}
                            onClick={el => {
                                this.setState({
                                    text: this.state.text + el.text
                                })
                                console.log(el)
                            }}
                            />
                        :null}
                    </List>
                </div>
            </div>

        )
    }
}

export default Chat