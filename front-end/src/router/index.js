import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Contact from '../views/Contact.vue'
import File from '../views/File.vue'
import FavList from '../views/FavList.vue'
import QuickList from '../views/QuickList.vue'
import Feedback from '../views/Feedback.vue'
import ToolView from '../views/ToolView'
import RegistUser from '../views/RegistUser'
Vue.use(VueRouter);



export default new VueRouter ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes : [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/main',
        name:'Main',
        component: Main
      },
      {
        path: '/contact',
        name:'Contact',
        component: Contact
      },
      {
        path: '/RegistUser',
        name: 'RegistUser',
        component: RegistUser
      },
      {
        path: '/login',
        name: 'Login',
        component:Login,
      },
      {
        path:'/file',
        name:'File',
        component: File
      },
      {
        path:'/fav',
        name:'Fav',
        component: FavList
      },
      {
        path:'/quick',
        name:'Quick',
        component : QuickList
      },
      {
        path:'/feedback',
        name:'Feedback',
        component: Feedback
      }

    ]
})
