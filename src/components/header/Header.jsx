import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Modal } from "antd"
import menuList from '../../config/menuList'
import user from '../../utils/userSaveMemory'
import {removeStore} from '../../utils/userSaveStorage'
import LinkButton from "../linkButton/LinkButton"
import ajax from '../../api/ajax'
import "./css/header.less"
class Header extends Component {
    state = {
        isModalVisible:false,
        time:'2021-1-31 15:1:50'
    }
	handleLogout = () => {
        this.setState({isModalVisible:true})
    }
    getTime = ()=>{
        var date = new Date()
        return date.getFullYear() + "年" + (date.getMonth()+1) +'月'+ date.getDate()+'日'+date.getHours()+'时'+
        date.getMinutes()+'分'+date.getSeconds()+'秒'
    }
   async componentDidMount(){
        const t = await ajax('http://gfapi.mlogcn.com/weather/v001/now?areacode=101010100&output_type=json&key=TX7exdCY9SEBPeBjOdeIJ648hGdIRgdY')
        this.sky = ''
        if(t.status === 0){
            this.sky = t.result.realtime.text
        }
            this.update = setInterval(() => {
            this.setState({time:this.getTime()})
        }, 1000);
    }
    componentWillUnmount(){
    clearInterval(this.update)
    }
	render() {
        const path = this.props.location.pathname
        let title = ''
         menuList.forEach(item => {
            // console.log(123)
            if(!item.children){
                if(item.key === path) title = item.title
            }else {
                item.children.forEach(item2=>{
                    if(item2.key === path) title = item2.title
                })
            }
            return 
        });
        // console.log(title)
		return (
			<div className='header'>
				<div className='header-top'>
					<span>欢迎,{user.userInfo.username ? user.userInfo.username:'请不要违规操作'}</span>
					<LinkButton onClick={this.handleLogout}>退出</LinkButton>
					<Modal
						visible={this.state.isModalVisible}
						onOk={()=>{
                            removeStore()
                            user.userInfo = {}
                            this.props.history.push('/login')
                            this.setState({isModalVisible:false})
                        }}
						onCancel={()=>{
                            this.setState({isModalVisible:false})
                           
                        }}
					>
						<p>你确定退出登录吗</p>
					</Modal>
				</div>
				<div className='header-bootom'>
					<div className='header-botom-left'>
						<span>{title}</span>
					</div>
					<div className='header-botom-right'>
						<span>{this.state.time}</span>
						<img
							src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2760055679,3544757687&fm=11&gp=0.jpg'
							alt='天气图片'
						/>
						<span className='weather'>{this.sky}</span>
					</div>
				</div>
			</div>
		)
	}
}
export default withRouter(Header)
