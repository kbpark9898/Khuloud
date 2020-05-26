import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    folders: [],
    files: [],
  },
  mutations: {
    setId(state, userid){
      state.id = userid;
    },
    clearid(state){
      state.id= '';
    },
    setFolder(state, folderlist){
      state.folders  = folderlist;
    },
    setFile(state, filelist){
      state.files = fileList;
    }
  },
  getters: {
    isLogin(state){
      return state.id !== '';
    },
    userID(state){
      return state.id;
    },
    folderL(state){
      return state.folders;
    },
    fileL(state){
      return state.files;
    }
  }
})
