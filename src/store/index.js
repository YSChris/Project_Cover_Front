import Vue from 'vue';
import Vuex from 'vuex';
import bMapInfoWindowStatus from './modules/bMap_info_window_status'

Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        bMapInfoWindowStatus
    }
})