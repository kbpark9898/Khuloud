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
<<<<<<< HEAD
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

export { registerUser, loginUser, folder, makeFolder };
=======
  }
  
function dropbox(userData){
  return axios.get(`/api/folder/show/${userData}`);
}

function makeFolder(folderData){
  return axios.post('/api/folder/makefolder', folderData);
}

  export { registerUser, loginUser, dropbox, makeFolder };
>>>>>>> eacf2da71fd7ae8340b48d4dac8ee121a816fd94
