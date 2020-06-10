import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.VUE_APP_API_URL,
});

function registerUser(userData) {
	// const url = 'http://localhost:3000/api/signup'
	return axios.post('/api/RegistUser', userData);
}

function loginUser(userData) {
	// const url = 'http://localhost:3000/api/login'
	return axios.post('/api/login', userData);
}

function folder(curData) {
	return axios.get('/api/folder/show', {
		params: {
			id: curData.id,
			folder_id: curData.folder_id,
		},
	});
}

function makeFolder(folderData) {
	return axios.post('/api/folder/makefolder', folderData);
}

function deleteFolder(folderData) {
	return axios.post('/api/folder/delfolder', folderData);
}

function moveFolder(folderData) {
	return axios.post('/api/folder/move', folderData);
}

function file(curData) {
	return axios.get('/api/file', {
		params: {
			id: curData.id,
			cur: curData.cur,
		},
	});
}

function uploadFile(fileData) {
	return axios.post('/api/file/upload', fileData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

function detailFile(fileData) {
	return axios.get(`/api/file/${fileData.fileName}`, {
		params: {
			id: fileData.id,
			cur: fileData.cur,
		},
	});
}

function deleteFile(fileData) {
	return axios.get(`/api/file/delete/${fileData.fileName}`, {
		params: {
			//현재 접속한 사람의 id와 삭제할 파일의 이름, 현재 폴더위치를 파라미터로 넘긴다.
			id: fileData.user_id,
			cur: fileData.cur,
		},
	});
}
function downloadFile(fileData) {
	return axios.get(`/api/file/download/${fileData.fileName}`, {
		params: {
			//현재 접속한 사람의 id와 다운로드를 위해 선택한 파일의 이름을 파라미터로 넘긴다.
			id: fileData.id,
			cur: fileData.cur,
		},
	});
}

function accessedList(curData) {
	return axios.get('/api/quick', {
		params: {
			id: curData.id,
		},
	});
}

function showTrashcan(userId) {
	return axios.get('/api/trashcan/show', {
		params: {
			id: userId,
		},
	});
}

function modifyFile(fileData) {
	return axios.post(`/api/file/modify/${fileData.name}`, fileData);
}

function delFavorite(folderData) {
	return axios.post('/api/favorites/delfolder', folderData);
}

function addFavorite(folderData) {
	return axios.post('/api/favorites/addfolder', folderData);
}

function moveFile(fileData) {
	return axios.post('/api/folder/move', fileData);
}

function delFavoriteFile(fileData) {
	return axios.post('/api/favorites/delfile', fileData);
}

function addFavoriteFile(fileData) {
	return axios.post('/api/favorites/addfile', fileData);
}

function getFavoriteList(userId) {
	return axios.get('/api/favorites/show', {
		params: {
			id: userId,
		},
	});
}

function shareFile(shareData) {
	return axios.post('/api/share', shareData);
}

function tdelFolder(tData) {
	return axios.get('/api/trashcan/delfolder', {
		params: {
			id: tData.id,
			folder_id: tData.folder_id,
		},
	});
}

function tdelFile(tData) {
	return axios.get('/api/trashcan/delfile', {
		params: {
			id: tData.id,
			file_id: tData.file_id,
		},
	});
}

function tdelAll(userId) {
	return axios.get('/api/trashcan/all', {
		params: {
			id: userId,
		},
	});
}
function uploadContact(contactData){
	return axios.post('/api/contact/contact_upload', contactData.file,{
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		params:{
				id: contactData.id,
		}
	});
}
function downloadContact(userID){
	return axios.post('/api/contact/contact_download', null, {params:{id:userID}});
}
function printContact(userID){
	console.log(String(userID));
	return axios.post('api/contact/contact_list', {id:userID}, {params:{id:userID},});
}
function deleteContact(userID){
	return axios.post('api/contact/contact_delete', {id:userID}, {params:{id:userID}});
}

export {
	registerUser,
	loginUser,
	folder,
	makeFolder,
	deleteFolder,
	moveFolder,
	file,
	uploadFile,
	deleteFile,
	downloadFile,
	delFavorite,
	addFavorite,
	moveFile,
	delFavoriteFile,
	addFavoriteFile,
	accessedList,
	detailFile,
	modifyFile,
	getFavoriteList,
	shareFile,
	tdelFolder,
	tdelFile,
	tdelAll,
	showTrashcan,
	uploadContact,
	downloadContact,
	printContact,
	deleteContact
};
