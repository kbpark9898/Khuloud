import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        id: '',
        folders: [],
        files: [],
        cur: '/',
        parent: '/'
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
        },
        setParent(state, parent) {
            state.parent = parent;
        }
    },
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
        },        
        setFolder(state, folderlist){
          state.folders  = folderlist;
        },
        setFile(state, filelist){
          state.files = filelist;
        },
  },
})