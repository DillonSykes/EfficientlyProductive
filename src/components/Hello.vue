<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <h2>{{ msg }}</h2>
    <NewActivity v-if="test"></NewActivity>
    <button v-show="showEnter" @click="enterSite()">Enter!</button>
    <h3 v-show="show">Enter Username:</h3>
    <input v-show="show" id="pN" type="text">
    <button v-show="show" @click="saveName()">Save</button>
    <p v-show="second">What would you like todo?</p>
    <button v-show="second" @click="newAct()">New Activity</button>
    <button v-show="second">Earn EP</button>
    <button v-show="second">History</button>
    <p v-show="second">Total EP: {{ totalEP }} </p>
    <p v-show="second">Today's EP: {{ todaysEP }} </p>

  </div>
</template>

<script>
  import NewActivity from '@/components/NewActivity.vue'
export default {
    name: 'hello',
    data () {
      return {
        title: 'Welcome to Efficiently-Productive',
        msg: 'Where being productive actually means something. Click to get started.',
        show: false,
        showEnter: true,
        second: false,
        userName: '',
        totalEP: 0,
        todaysEP: 0,
        test: false
      }
    },
    methods: {
      enterSite: function () {
        this.show = !this.show
        this.showEnter = !this.showEnter
      },
      saveName: function () {
        this.userName = document.getElementById('pN').value
        this.msg = 'Welcome ' + this.userName
        this.show = !this.show
        this.second = !this.second
      },
      newAct: function () {
        this.test = !this.test
      }
    },
    components: {
      'NewActivity': NewActivity
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
