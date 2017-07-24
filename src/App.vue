<template>
  <div id=”app” class="container">
    <modal v-if="readMe">
      <h1 slot="header">
        ReadMe
      </h1>
      <div slot="body">
        <p>There are 2 primary ways to use this site.
          <br/>
          <br/>
          1. To track productivity on a daily basis by adding activities and assigning them points.
             As weeks go by you can start to notice trends such as maybe on wednesdays you dont complete as many tasks as you'd like.
          <br/>
          <br/>
          2. One can use this site as a habit tracker adding positive habits worth " + " points (e.g. going to the gym +30 points) or negative
             habits for " - " points (e.g. smoking a cigarette -10 points).
        </p>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-default" @click="openReadme()">Close</button>
      </div>
    </modal>
    <div class="page-header">
      <h1 class="text-center">HabitTrack</h1>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <button type="button" class="btn btn-default navbar-btn">{{ this.user }}</button>
    <button @click="logOut" type="button" class="btn btn-default navbar-btn">Sign out</button>
    <button type="button" class="btn btn-default navbar-btn" @click="openReadme()" style="float: right">Readme</button>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import modal from '@/components/modal.vue'
  export default {
    name: 'app',
    data () {
      return {
        user: firebase.auth().currentUser.displayName,
        readMe: false
      }
    },
    methods: {
      logOut () {
        firebase.auth().signOut()
        this.$router.push('/')
        this.user = ''
      },
      openReadme () {
        this.readMe = !this.readMe
      }
    },
    components: {
      'modal': modal
    }
  }
</script>
<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
</style>
