import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "./utils/axios";
import api from "./plugins/api";
import Highlight from "./utils/highLight";
import 'src/assets/iconfont/iconfont.scss'
import 'github-markdown-css/github-markdown-light.css'
// import {methods} from "./utils/vuePrototype";
import './utils/vuePrototype'
Vue.config.productionTip = false

// ;(s=>s.keys().forEach(k=>s[k].default&&Vue.use(s[k].default)))(require.context('./utils',true,/\.js$/))

Vue.use(api)
Vue.use(Highlight)
// Vue.mixin(methods)

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
    axios,
    render: h => h(App)
}).$mount('#app')
