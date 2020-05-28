import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Login from '../views/Login.vue'
// import Main from '../views/Main.vue'
// import Contact from '../views/Contact.vue'
// import File from '../views/File.vue'
// import FavList from '../views/FavList.vue'
// import QuickList from '../views/QuickList.vue'
// import Feedback from '../views/Feedback.vue'
// import ToolView from '../views/ToolView'
// import RegistUser from '../views/RegistUser'
Vue.use(VueRouter);



export default new VueRouter ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes : [
      {
        path: '/',
        redirect: '/Login'
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/main',
        name:'Main',
        component: () => import('../views/Main.vue')
      },
      {
        path: '/contact',
        name:'Contact',
        component: () => import('../views/Contact.vue')
      },
      {
        path: '/registuser',
        name: 'RegistUser',
        component: () => import('../views/SignupPage.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginPage.vue')
      },
      {
        path:'/file',
        name:'File',
        component: () => import('../views/File.vue')
      },
      {
        path:'/fav',
        name:'Fav',
        component: () => import('../views/FavList.vue')
      },
      {
        path:'/quick',
        name:'Quick',
        component : () => import('../views/QuickList.vue')
      },
      {
        path:'/feedback',
        name:'Feedback',
        component: () => import('../views/Feedback.vue')
      },
<<<<<<< HEAD
      {
        path: '/folder',
        name: 'Folder',
        component: () => import('../views/FolderPage.vue')
      },
=======

>>>>>>> ec5658f978ed2a5a94bba39bcb9aecf9edc70c36
    ]
})
