const state = {
    selected_code: ""
}

const getters = {
    getSelectedCode(state){
        return state.selected_code;
    }
}

const mutations = {
    setSelectedCode: (state, code) =>{
        state.code = code;
    }
}

const actions = {
    setSelectedCode(context, args){
        context.commit('setSelectedCode', args);
    }
}

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}