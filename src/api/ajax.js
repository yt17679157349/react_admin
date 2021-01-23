import axios from "axios"
import { message } from 'antd';

export default function ajax(path, data = {}, type = "GET") {
    return new Promise ((resolve,reject)=>{
        let promise

        if (type === "GET") {
            promise = axios.get(path, {
                params: data,
            })
        }
        if (type === "POST") {
            promise = axios.post(path,data)
        }
        promise.then((response)=>{
            resolve(response.data)
        }).catch((error)=>{
            message.error(`请求出错:${error.message}`)
        })
    })
   
}
