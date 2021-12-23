import curl from 'src/utils/axios'

export const $api={
    reqTest:(data)=>curl('users/getUserInfo?id=1',data),
    reqMd:(data)=>curl('doc/md',data),
    reqArticleList:(data)=>curl(`doc/article`,data)
}

export default {
    install (Vue) {
        Vue.prototype.$api = $api
    }
}