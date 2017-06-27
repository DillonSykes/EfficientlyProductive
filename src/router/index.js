import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Hello from '@/components/Home'
import Callback from '@/components/Callback'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Hello
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    }
  ],
  mode: 'history'
})
