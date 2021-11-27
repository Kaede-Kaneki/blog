import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'src/assets/iconfont/iconfont.scss'

Vue.config.productionTip = false

//使用跳转页面自定义的title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
