<template>
  <div id=”app” class="container">
    <div class="page-header">
      <h1 class="text-center">Efficiently Productive</h1>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <button type="button" class="btn btn-default navbar-btn">{{ this.user }}</button>
    <button @click="logOut" type="button" class="btn btn-default navbar-btn">Sign out</button>
  </div>
</template>
<script>
  import firebase from 'firebase'
  export default {
    name: 'app',
    data () {
      return {
        user: firebase.auth().currentUser.displayName
      }
    },
    methods: {
      logOut () {
        firebase.auth().signOut()
        this.$router.push('/')
        this.user = ''
      }
    }
  }
</script>
<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
</style>
