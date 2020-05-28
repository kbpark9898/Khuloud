import axios from 'axios'

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
            cur: curData.cur
        }
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



export { registerUser, loginUser, folder, makeFolder, deleteFolder, moveFolder };