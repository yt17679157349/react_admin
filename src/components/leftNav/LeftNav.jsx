import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { Menu } from "antd"
import { createFromIconfontCN } from "@ant-design/icons"
import menuList from "../../config/menuList"
import "./css/leftNav.less"

const IconFont = createFromIconfontCN({
	scriptUrl: "//at.alicdn.com/t/font_2357508_dtut1bryym.js",
})

const { SubMenu } = Menu

class LeftNav extends Component {
	generateMenu = (menuList) => {
		return menuList.map((item) => {
			if (!item.children) {
				return (
					<Menu.Item key={item.key}>
						<Link to={item.key}>
							<IconFont type={item.icon} style={{ fontSize: "16px" }} />

							<span>{item.title}</span>
						</Link>
					</Menu.Item>
				)
			} else {
				return (
					<SubMenu
						key={item.key}
						title={
							<>
								<IconFont
									type={item.icon}
									style={{ fontSize: "16px" }}
								></IconFont>
								<span>{item.title}</span>
							</>
						}
					>
						{this.generateMenu(item.children)}
					</SubMenu>
				)
			}
		})
	}
	UNSAFE_componentWillMount() {
		this.menuNode = this.generateMenu(menuList)
	}
	render() {
		let currentlySelected = this.props.history.location.pathname

		return (
			<div className='leftMenu'>
				<Menu
					selectedKeys={[currentlySelected]}
					mode='inline'
					theme='dark'
				>
					{this.menuNode}
				</Menu>
			</div>
		)
	}
}
export default withRouter(LeftNav)
/* <Menu.Item key='/welcome' >
							<Link to='/welcome'>
                            <IconFont type="iconshouye"  style={{fontSize:'16px'}}/>
                        
                            <span>首页</span>
                            </Link>
						
					</Menu.Item>
					<SubMenu key='sub1' title={
                        <>
                        <IconFont type='iconappstore' style={{fontSize:'16px'}}></IconFont>
                        <span>商品</span>
                        </>
                    }>
						<Menu.Item key='5'>
                            <Link>
                            <IconFont type='iconfenlei' style={{fontSize:'16px'}}></IconFont>
                            <span>品类管理</span>
                            </Link>
                        </Menu.Item>
						<Menu.Item key='6'>
                             <Link>
                             <IconFont type='icontool' style={{fontSize:'16px'}}></IconFont>
                             <span>商品管理</span>
                             </Link>
                             </Menu.Item>
						
					</SubMenu> */
