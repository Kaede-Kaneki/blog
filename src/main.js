import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'src/assets/iconfont/iconfont.scss'
import 'github-markdown-css'
import 'highlight.js/styles/tomorrow-night-bright.css'

Vue.config.productionTip = false

//使用跳转页面自定义的title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        let title=to.meta.title
        if(title==='北野')  {document.title = title}
        else document.title = title+'-'+'北野'
    }
    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
