import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "./utils/axios";
import 'src/assets/iconfont/iconfont.scss'
import 'github-markdown-css/github-markdown-light.css'
import 'src/assets/scss/nprogress.reset.scss'
import './utils/vuePrototype'
Vue.config.productionTip = false

;(s=>s.keys().forEach(k=>(s(k).default)&&Vue.use(s(k).default)))(require.context('./plugins',true,/\.js$/))

//扩展前端监控
Vue.config.errorHandler = (err, vm, info) => {
    //msg 若为空，msg.null会报错
    const msg = err && typeof err === 'object' ? err.msg || err.errorMsg || err.message || JSON.stringify(err) : `${err}`
    // Toast(msg)
    console.log("errorHandler =>",msg, info)
}

//使用跳转页面自定义的title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        let title=to.meta.title
        if(title === '北野')  {document.title = title}
        else document.title = title+'-'+'北野'
    }
    next()
})

new Vue({
    router,
    store,
    axios,
    render: h => h(App)
}).$mount('#app')
