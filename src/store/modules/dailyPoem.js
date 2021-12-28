import {$api} from "../../plugins/api";
import {Local} from '../../utils/storage'

const PoemToken = "SET_JINRISHICI_TOKEN"

const state = {
    token: "",
    poem: "",
}

const mutations = {
    SET_JINRISHICI_TOKEN(state, token) {
        state.token = token
        Local.set(`${PoemToken}`, token)
    },
    mutationSetPoem(state, poem) {
        state.poem = poem
    }

}

const actions = {
    actionToken({commit},) {
        if (Local.get(`${PoemToken}`) === null) {
            return $api.reqPoemToken().then(res => {
                commit('SET_JINRISHICI_TOKEN', res)
            })
        }
    },
    actionGetPoem({state,commit}) {
        if(state.poem === ""){
            return $api.reqPoem().then(res=>{
                const {content} = res
                commit('mutationSetPoem',content)
            })
        }

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
