<template>
  <div id="firebaseui-auth-container">
    <h1 class="text-center">Please sign in to view your account</h1>
  </div>
</template>
<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
export default {
  name: 'auth',
  mounted () {
    var uiConfig = {
      signInSuccessUrl: '/Home',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    var ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>
