import Vue from 'vue'
// import App from './App.vue'
import Router from 'vue-router'

import Profile from '@/components/pages/Profile'
import TargetSchool from '@/components/pages/TargetSchool'
import DreamSchool from '@/components/pages/DreamSchool'


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
    }
  ]
})

