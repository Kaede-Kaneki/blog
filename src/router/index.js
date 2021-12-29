import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect:' ',
        component: () => import('src/views/index.vue'),
        children: [
            {
                path:' ',
                name:'Home',
                component: ()=>import('src/views/home/home'),
                meta:{
                    title: '北野'
                }
            },
            {
                path:'blog',
                name:'Blog',
                component: ()=>import('src/views/blog/blog'),
                meta:{
                    title: '博客'
                },
                children:[
                    {
                        path:':note',
                        name:'Note',
                        component: ()=>import('src/views/blog/note'),
                    },
                ]
            },
            {
                path:'articles',
                name:'Passages',
                component:()=>import('src/views/articles/index'),
                meta: {
                    title: '文章'
                }
            },
            {
                path:'resource',
                name:'Resource',
                component:()=>import('src/views/resource/resource'),
                meta: {
                    title: '资源'
                }
            },
            {
                path:'about',
                name:'About',
                component:()=>import('src/views/about/about'),
                meta: {
                    title: '关于'
                }
            },

            // {
            //     path:'*',
            //     redirect:{name:'Home'}
            // }

        ]
    },


]

const router = new VueRouter({
    mode:'hash',
    routes,
    scrollBehavior(to,from,saveTop){
        if(saveTop){
            return saveTop;
        }else{
            return {x:0,y:0}
        }
    },
})

router.beforeEach((to,from,next)=>{
    NProgress.start()
    next()
})

router.afterEach(()=>{
    NProgress.done()
})
export default router
