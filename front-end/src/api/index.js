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
  
  export { registerUser, loginUser };