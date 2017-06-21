import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import NewActivity from '@/components/NewActivity.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/NewActivity',
      name: 'NewActivity',
      component: NewActivity
    }
  ],
  mode: 'history'
})
