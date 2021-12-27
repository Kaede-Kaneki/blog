import curl from 'src/utils/axios'

const baseURL="http://localhost:3000/"

export const $api = {
    reqMd: (data) => curl(`${baseURL}doc/md`, data,"get"),
    reqArticle: (data) => curl(`${baseURL}doc/article`, data,"get"),
}

export default {
    install(Vue) {
        Vue.prototype.$api = $api
    }
}
