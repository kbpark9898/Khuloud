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

function file(curData){
  return axios.get('/api/file', {
      params: {
          id: curData.id,
          cur: curData.cur
      }
  });
}


function uploadFile(fileData){
    return axios.post('/api/file/upload', fileData);
}

function detailFile(fileData){
    return axios.get(`/api/file/${fileData.name}`, {
      params:{
        id: fileData.id,
        cur: fileData.cur
      }
    })
}
function deleteFile(fileData){
    return axios.get('/api/file/delete', {
      params:{
        //현재 접속한 사람의 id와 삭제할 파일의 이름, 현재 폴더위치를 파라미터로 넘긴다.
        id: fileData.id,
        name: fileData.fileName,
        cur: fileData.cur
      }
    });
}
function downloadFile(fileData){
    return axios.get('api/file/download', {
      params:{
        //현재 접속한 사람의 id와 다운로드를 위해 선택한 파일의 이름을 파라미터로 넘긴다.
        id: fileData.id,
        name: fileData.fileName,
        cur: fileData.cur
      }
    });
}



export { registerUser, loginUser, folder, makeFolder, deleteFolder, moveFolder,
  file, uploadFile, deleteFile, downloadFile };
