import Vue from 'vue'
import VueRouter from 'vue-router'

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
                        path:'note',
                        name:'Note',
                        component: ()=>import('src/components/notes/index'),
                    },
                    {
                        path:'test',
                        name:'Test',
                        component: ()=>import('src/components/notes/test'),
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
    routes
})

export default router
