import curl from 'src/utils/axios'

const baseURL='/localSever'
const poems='/poems'
export const $api = {
    reqMd: (data) => curl(`${baseURL}/doc/md`, data,"get"),
    reqArticle: (data) => curl(`${baseURL}/doc/article`, data,"get"),
    reqSetComment:(data) => curl(`${baseURL}/doc/setComment`,data,"post"),
    reqGetComment:(data) =>curl(`${baseURL}/doc/getComment`,data,"get"),
    reqSetReply:(data)=>curl(`${baseURL}/doc/setReply`,data,"post"),
    reqPoemToken:(data)=>curl(`${poems}/token`,data,"get"),
    reqPoem:(data)=>curl(`${poems}/sentence`,data,"get"),
}

export default {
    install(Vue) {
        Vue.prototype.$api = $api
    }
}
