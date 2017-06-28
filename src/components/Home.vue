<template>
  <div class="Home">
    <modal v-if="showHistory">
      <h1 slot="header" class="modal-title">
        History
      </h1>

      <div slot="body">
        <DataView>
            <tr slot="name" v-for="act in history">
              <th>{{ date.toLocaleDateString("en-US") }}</th>
              <td> {{ act.name }} </td>
              <td> {{ act.pts }} </td>
            </tr>
        </DataView>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-outline-info" @click=" historyBtn()"> Close </button>
      </div>
    </modal>
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

      <div slot="body" class="dropdown">
        <select id="A">
          <option v-for="act in actList">{{ act.name }} {{ act.pts }}</option>
        </select>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-outline-info" @click="earnEP()"> Close </button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitEP()">
          Redeem
        </button>
      </div>
    </modal>
    <h1 class="text-center">{{ title }}</h1>
    <h2 class="text-center">{{ msg }}</h2>
    <div class="center-block">
      <p v-show="second" class="text-center">What would you like todo?</p>
      <div class="card">
        <!--<img class="card-img-top" src="/images/pathToYourImage.pngs" alt="Card image cap">-->
        <div class="card-block">
          <h4 class="card-title">Add Activities</h4>
          <p class="card-text">
            Here you can add new activities and assign them point values. (Weight them based on your own preference)
          </p>
          <button type="button" class="btn btn-primary btn-lg" @click="newAct()">New Activity</button>
        </div>
      </div>
      <div class="card">
        <!--<img class="card-img-top" src="/images/pathToYourImage.png" alt="Card image cap">-->
        <div class="card-block">
          <h4 class="card-title">Earn Efficiently Productive Points</h4>
          <p class="card-text">
            Here you can Add EP to your EP score, as you complete activities choose them from your unique list
          </p>
          <button type="button" class="btn btn-primary btn-lg" @click="earnEP()">Earn EP</button>
        </div>
      </div>
      <div class="card">
        <!--<img class="card-img-top" src="/images/pathToYourImage.png" alt="Card image cap">-->
        <div class="card-block">
          <h4 class="card-title">History</h4>
          <p class="card-text">
            Here you can look at your history, can you improve in any area?
          </p>
          <button type="button" class="btn btn-primary btn-lg" @click="historyBtn()">History</button>
        </div>
      </div>
      <div class="alert alert-info" role="alert">
        <strong>
          <p class="text-center">Total EP: {{ this.totalEP }} </p>
          <p class="text-center">Today's EP: {{ this.todaysEP }} </p>
        </strong>
      </div>
    </div>

  </div>
</template>

<script>
  import modal from '@/components/modal.vue'
  import DataView from '@/components/DataView.vue'
export default {
    name: 'Home',
    data () {
      return {
        title: 'Welcome to Efficiently-Productive',
        msg: 'Where being productive actually means something.',
        show: false,
        showEnter: true,
        second: false,
        userName: '',
        totalEP: 0,
        todaysEP: 0,
        showActModal: false,
        showEPModal: false,
        showHistory: false,
        name: '',
        pts: 0,
        actList: [],
        history: [],
        date: new Date()
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
        function Act (aName, aPts) {
          this.name = aName
          this.pts = aPts
        }
        var n = document.getElementById('actName').value
        var p = document.getElementById('actPts').value
        var tmp = new Act(n, p)
        this.actList.push(tmp)
        this.newAct()
      },
      earnEP: function () {
        this.showEPModal = !this.showEPModal
      },
      submitEP: function () {
        function Act (aName, aPts) {
          this.name = aName
          this.pts = aPts
        }
        this.earnEP()
        var el = document.getElementById('A')
        var tmp = el.options[el.selectedIndex].value
        var splitRa = tmp.split(' ')
        var name = splitRa[0]
        var pts = splitRa[1]
        var actObj = new Act(name, pts) // Creates new activity obj to put into history array
        this.history.push(actObj)
        pts = parseInt(pts) // Change pts from string to int
        this.todaysEP += pts
        this.totalEP += pts
      },
      historyBtn: function () {
        this.showHistory = !this.showHistory
      }
    },
    components: {
      'modal': modal,
      'DataView': DataView
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
