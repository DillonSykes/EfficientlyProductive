// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import {config} from './helpers/firebaseConfig.js'
import firebase from 'firebase'
import VueFire from 'vuefire'
Vue.use(VueRouter)
Vue.use(VueFire)
Vue.config.productionTip = false
/* eslint-disable no-new */
const unSubscribe = firebase.initializeApp(config).auth().onAuthStateChanged((user) => {
  new Vue({
    el: '#app',
    data () {
      return {
      }
    },
    router,
    render: h => h(App)
  })
  unSubscribe() // stop listening
})

