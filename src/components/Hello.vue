<template>
  <div class="hello">
    <modal v-if="showActModal">
      <h3 slot="header" class="modal-title">
        New Activity
      </h3>
      <div slot="body">
        <input id="actName" type="text" placeholder="Enter Activity Name">
        <input id="actPts" type="number" placeholder="# Of EP">
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-outline-info" @click=" newAct()"> Close </button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()">
          Submit
        </button>
      </div>
    </modal>
    <modal v-if="showEPModal">
      <h3 slot="header" class="modal-title">
        Choose activity to record
      </h3>

      <div slot="body">
        <select>
          <option v-for="act in actList">{{ act }}</option>
        </select>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-outline-info" @click="earnEP()"> Close </button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()">
          Submit
        </button>
      </div>
    </modal>
    <h1>{{ title }}</h1>
    <h2>{{ msg }}</h2>
    <button v-show="showEnter" @click="enterSite()">Enter!</button>
    <h3 v-show="show">Enter Username:</h3>
    <input v-show="show" id="pN" type="text">
    <button v-show="show" @click="saveName()">Save</button>
    <p v-show="second">What would you like todo?</p>
    <button v-show="second" @click="newAct()">New Activity</button>
    <button v-show="second" @click="earnEP()">Earn EP</button>
    <button v-show="second">History</button>
    <p v-show="second">Total EP: {{ totalEP }} </p>
    <p v-show="second">Today's EP: {{ todaysEP }} </p>

  </div>
</template>

<script>
  import modal from '@/components/modal.vue'
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
        showActModal: false,
        showEPModal: false,
        act: {
          name: '',
          pts: 0
        },
        actList: []
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
        this.showActModal = !this.showActModal
      },
      submitAndClose: function () {
        this.act.name = document.getElementById('actName').value
        this.act.pts = document.getElementById('actPts').value
        this.actList.push(this.act)
        this.newAct()
      },
      earnEP: function () {
        this.showEPModal = !this.showEPModal
      }
    },
    components: {
      'modal': modal
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
