
const state = {
    articles:[], //博文数组
    menu:[], //博客分类目录
}

const mutations = {
    mutationSetArticles(state,articles){
        state.articles=articles
    },
    mutationSetMenu(state,menu){
        state.menu=menu
    },
}

const actions ={
    actionGetArticles({commit}){
        commit('mutationSetArticles',"data")
    },
    actionGetMenu({commit}){
        commit('mutationSetMenu',"data")
    },
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}
