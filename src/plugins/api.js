import curl from 'src/utils/axios'

export const $api = {
    reqMd: (data) => curl('doc/md', data),
    reqArticle: (data) => curl(`doc/article`, data)
}

export default {
    install(Vue) {
        Vue.prototype.$api = $api
    }
}
