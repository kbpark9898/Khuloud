import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
<<<<<<< HEAD
    state: {
        id: '',
        folders: {},
        files: {},
        cur: '/',
=======
  state: {
    id: '',
    folders: [],
    files: [],
    cur:'/',
  },
  mutations: {
    setId(state, userid){
      state.id = userid;
>>>>>>> eacf2da71fd7ae8340b48d4dac8ee121a816fd94
    },
    mutations: {
        setId(state, userid) {
            state.id = userid;
        },
        clearid(state) {
            state.id = '';
        },
        setFolder(state, folderlist) {
            state.folders = folderlist;
        },
        setFile(state, filelist) {
            state.files = filelist;
        },
        setCur(state, cur) {
            state.cur = cur;
        }
    },
<<<<<<< HEAD
    getters: {
        isLogin(state) {
            return state.id !== '';
        },
        userID(state) {
            return state.id;
        },
        folderL(state) {
            return state.folders;
        },
        fileL(state) {
            return state.files;
        },
        cur(state) {
            return state.cur;
        }
=======
    setFolder(state, folderlist){
      state.folders  = folderlist;
    },
    setFile(state, filelist){
      state.files = filelist;
    },
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
>>>>>>> eacf2da71fd7ae8340b48d4dac8ee121a816fd94
    }
})