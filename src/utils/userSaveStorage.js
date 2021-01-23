import store from 'store2';
const USER_INFO = 'user_info'
export function steStore(value){
    store.set(USER_INFO,value)
}
export function getStore(){
    return store.get(USER_INFO)
}
export function removeStore(){
    store.remove(USER_INFO)
}