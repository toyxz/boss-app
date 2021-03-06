import React from 'react'
import { Grid , List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSeletor extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                            .split(',')
                            .map(v => ({
                                icon: require(`../img/${v}.png`),
                                text: v
                            }))
        const gridHeader = this.state.text 
                            ? (<div>
                                <span>已经选择头像</span>
                                <img style={{width:20}} src={this.state.icon} alt=""/>
                                </div>)
                            : (<div>请选择头像</div>)
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid 
                        data={avatarList} columnNum={5}
                        onClick = { elm => {
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)  // 主要用来将avatar 传入store 的
                        }}
                    />
                </List>
            </div>
        )
    }
}
export default AvatarSeletor