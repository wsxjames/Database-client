import Vue from 'vue'
// import App from './App.vue'
import Router from 'vue-router'

import Profile from '@/components/pages/Profile'
import TargetSchool from '@/components/pages/TargetSchool'
import DreamSchool from '@/components/pages/DreamSchool'
import Login from '@/components/pages/Login'
import Logout from '@/components/pages/Logout'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }, 
    {
      path: '/targetschool',
      name: 'TargetSchool',
      component: TargetSchool
    },
    {
      path: '/dreamschool',
      name: 'DreamSchool',
      component: DreamSchool
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})

