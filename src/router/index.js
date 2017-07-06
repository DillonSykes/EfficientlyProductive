import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import firebase from 'firebase'
Vue.use(Router)

function requireAuth (to, from, next) {
  if (!firebase.auth().currentUser) {
    console.log('User is not logged in')
    next({
      path: '/auth',
      query: { redirect: '/Home' }
    })
  } else {
    console.log('User is logged in:', firebase.auth().currentUser.uid)
    next()
  }
}
export default new Router({
  routes: [
    {
      path: '/Home',
      component: Home,
      beforeEnter: requireAuth
    },
    {
      path: '/',
      name: 'Auth',
      component: Auth
    }
  ],
  mode: 'history'
})
