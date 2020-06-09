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
            folder_id: curData.cur,
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
};