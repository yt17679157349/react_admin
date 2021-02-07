import React, { Component } from "react"
import { Redirect, Link, Route, Switch } from "react-router-dom"
import { Layout } from "antd"
// import moduleName from "module"
import user from "../../utils/userSaveMemory"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import LeftNav from "../../components/leftNav/LeftNav"
// import {removeStore} from '../../utils/userSaveStorage'

// 引入content内的组件
import BrokenLine from "../content/chart/brokenLine/BrokenLine"
import Columnar from "../content/chart/columnar/Columnar"
import PieChart from "../content/chart/pieChart/PieChart"
import Category from "../content/commodity/category/Category"
import Goods from "../content/commodity/goods/Goods"
import Order from "..//content/order/Order"
import Role from "../content/role/Role"
import User from "../content/user/User"
import Welcome from "../content/welcome/Welcome"

import logo from "../../assets/img/logo.png"
import "./css/home.less"
const { Sider, Content } = Layout

export default class Home extends Component {
	
	componentDidUpdate(){

		if (!user.userInfo.username) {
			
			this.props.history.push('/login')
		}	
	}
	render() {
		
		return (
			<Layout className='home'>
				<Sider>
					<Link className='left-nav-header' to='/'>
						<img src={logo} alt='后台管理系统' />
						<h1>后台管理</h1>
					</Link>
					<LeftNav></LeftNav>
				</Sider>
				<Layout style={{ backgroundColor: "#F0F2F5" }}>
					<Header></Header>
					<Content className='home_content'>
						<Switch>
							<Route path='/welcome' component={Welcome}></Route>
							<Route path='/brokenLine' component={BrokenLine}></Route>
							<Route path='/columnar' component={Columnar}></Route>
							<Route path='/pieChart' component={PieChart}></Route>
							<Route path='/category' component={Category}></Route>
							<Route path='/goods' component={Goods}></Route>
							<Route path='/order' component={Order}></Route>
							<Route path='/role' component={Role}></Route>
							<Route path='/user' component={User}></Route>
							<Redirect to='/welcome'></Redirect>
						</Switch>
					</Content>
					<Footer></Footer>
				</Layout>
			</Layout>

			// <div>
			//     欢迎{user.userInfo.username}
			//     <button onClick={()=>{
			//         removeStore()
			//     }}>清除store</button>
			// </div>
		)
	}
}
