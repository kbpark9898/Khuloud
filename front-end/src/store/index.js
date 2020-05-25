import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
  },
  mutations: {
    setId(state, userid){
      state.id = id;
    },
    clearid(state){
      state.id= '';
    }
  },
  getters: {
    isLogin(state){
      return state.id !== '';
    }
  }
})
