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

<<<<<<< HEAD
function file(userData){
    return axios.get('/api/file', userData, {
        params: {
            user_id: userData.user_id
        }
    })
}


export { registerUser, loginUser, folder, makeFolder, file};

  
function dropbox(userData){
  return axios.get(`/api/folder/show/${userData}`);
}

//  export { registerUser, loginUser, dropbox, makeFolder };
=======
export { registerUser, loginUser, folder, makeFolder };
>>>>>>> ec5658f978ed2a5a94bba39bcb9aecf9edc70c36
