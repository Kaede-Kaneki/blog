import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    navBar:false,
    homeImgList:[
        {
            name:'Explore The World',
            url:'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            show:true,
        },
        {
            name:'Wild Forest',
            url:'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            show:false,
        },
        {
            name:'Sunny Beach',
            url:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
            show:false,
        },
        {
            name:'City on Winter',
            url:'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
            show:false,
        },
        {
            name:'Mountains - Clouds',
            url:'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            show:false,
        },
    ],
    poem:"",
    articleList:[]
}
const mutations = {
    mutationsHomeImgList(state,index){
        let arr=state.homeImgList
        for(let key in arr){
            arr[key].show=false
        }
        arr[index].show=true
    },
    mutationGetPoem(state,content){
        state.poem=content
    },
    mutationArticleList(state,list){
        state.articleList=list
    },
}
const actions = {
    actionsHomeImgList({commit},index=0){
        return commit('mutationsHomeImgList',index)
    },
    actionGetPoem({commit},content){
        return commit('mutationGetPoem',content)
    },
    actionArticleList({commit},list){
        return commit('mutationArticleList',list)
    }

}
const modules = {}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules
})
