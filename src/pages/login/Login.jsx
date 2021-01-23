import React, { Component } from "react"
import { Form, Input, Button ,message} from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"

import ajax from '../../api/ajax'
import user from '../../utils/userSaveMemory'
import {steStore} from '../../utils/userSaveStorage'
import logo from "./img/logo.png"
import "./css/login.less"
export default class Login extends Component {
	// 点击登录的回调函数
    handleLogin= async (values)=>{
        let res = await ajax('/login',values,'POST')
        if(res.status !== 0) {
            return message.error(res.msg)
        }
        user.userInfo = res.data
        steStore(res.data)
      
        this.props.history.replace('/')
        message.success('登陆成功')
        }
	render() {
		return (
			<div className='login'>
				<div className='login_header'>
					<img src={logo} alt='后台管理' />
					<h1>后台管理系统</h1>
				</div>
				<div className='login_content'>
					<h2>用户登陆</h2>
					<Form
						name='normal_login'
						className='login-form'
                        validateTrigger='onBlur'
                        onFinish={this.handleLogin}
					>
						<Form.Item
                                                validateFirst={true}

							name='username'
							rules={[
								{ required: true, message: "请输入用户名" },
								{
									validator: (_, value) => {
                                        
                                            var reg = /^[\u4e00-\u9fa5a-z\d_]{2,}$/gi
                                            var reg2 =/[\u4e00-\u9fa5]+/g
                                            if(!reg2.test(value)){
                                                if (reg.test(value)) {
                                                    var len = value.length
                                                    if (len < 4 || len > 12) {
                                                        return Promise.reject('只能输入数字、字母、下划线,且长度在4-12')
                                                    }
                                                return Promise.resolve()
                                                }
                                                return Promise.reject('只能输入数字、字母、下划线,且长度在4-12')
                                            }
                                            return Promise.reject('只能输入数字、字母、下划线,且长度在4-12')
                                            
                                       
                                       
									},
								},
							]}
						>
							<Input
								prefix={
									<UserOutlined
										className='site-form-item-icon'
										style={{ color: "rgba(0,0,0,0.4)" }}
									/>
								}
								placeholder='用户名'
							/>
						</Form.Item>
						<Form.Item
                                                                        validateFirst={true}

							name='password'
							rules={[
								{ required: true, message: "请输入密码" },
								{
									validator: (_, value) => {
                                       
                                            var reg = /^[\u4e00-\u9fa5a-z\d_]{2,}$/gi
                                            var reg2 =/[\u4e00-\u9fa5]+/g
                                            if(!reg2.test(value)){
                                                if (reg.test(value)) {
                                                    var len = value.length
                                                    if (len < 4 || len > 12) {
                                                        return Promise.reject('只能输入数字、字母、下划线,且长度在4-12')
                                                    }
                                                return Promise.resolve()
                                                }
                                                return Promise.reject('只能输入数字、字母、下划线,且长度在4-12')
                                            }
                                            return Promise.reject('只能输入数字、字母、下划线,且长度在4-12')
                                            
                                        
                                       
									},
								},
							]}
						>
							<Input
								prefix={
									<LockOutlined
										className='site-form-item-icon'
										style={{ color: "rgba(0,0,0,0.4)" }}
									/>
								}
								type='password'
								placeholder='密码'
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='login-form-button'
							>
								登陆
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		)
	}
}
