import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		id: '',
		folders: [],
		files: [],
		cur: '/',
		parent: '/',
		recentList: [],
		favFolderList: [],
		favFileList: [],
		trashFolderList: [],
		trashFileList: [],
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
		},
		setRecentList(state, list) {
			state.recentList = list;
		},
		setfavFolderList(state, fflist) {
			state.favFolderList = fflist;
		},
		setfavFileList(state, fflist) {
			state.favFileList = fflist;
		},
		settrashFolderList(state, tflist) {
			state.trashFolderList = tflist;
		},
		settrashFileList(state, tflist) {
			state.trashFileList = tflist;
		},
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
		recentL(state) {
			return state.recentList;
		},
		cur(state) {
			return state.cur;
		},
		setFolder(state, folderlist) {
			state.folders = folderlist;
		},
		setFile(state, filelist) {
			state.files = filelist;
		},
		favFolderL(state) {
			return state.favFolderList;
		},
		favFileL(state) {
			return state.favFileList;
		},
		trashFolderL(state) {
			return state.trashFolderList;
		},
		trashFileL(state) {
			return state.trashFolderList;
		},
	},
});
