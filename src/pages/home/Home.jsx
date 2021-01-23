import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import user from '../../utils/userSaveMemory'
import {removeStore} from '../../utils/userSaveStorage'
export default class Home extends Component {
    render() {
        if(!user.userInfo){
            return <Redirect to='/login'></Redirect>
        }
        return (

            <div>
                欢迎{user.userInfo.username}
                <button onClick={()=>{
                    removeStore()
                }}>清除store</button>
            </div>
        )
    }
}
