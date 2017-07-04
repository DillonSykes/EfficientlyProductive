<template>
  <div class="Home">
    <modal v-if="showHistory">
      <h1 slot="header" class="modal-title">
        History
      </h1>

      <div slot="body">
        <DataView>
            <tr slot="name" v-for="act in history">
              <th>Something</th>
              <td> {{ JSON.stringify(act) }} </td> // wrong needs up date
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
        <input id="actName" type="text" placeholder="Enter Activity Name" v-model="actObj.title">
        <input id="actPts" type="number" placeholder="# Of EP" v-model="actObj.points">
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
          <option v-for="act in activities">{{ act.title }} {{ act.points }}</option>
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
  import firebase from 'firebase'
export default {
    name: 'Home',
    firebase () {
      const userId = firebase.auth().currentUser.uid
      return {
        activities: firebase.database().ref('users/' + userId + '/myActs'),
        pointsRef: firebase.database().ref('users/' + userId + '/points/totalPoints/total'),
        historyRef: firebase.database().ref('users/' + userId + '/history')
      }
    },
    data () {
      return {
        title: 'Welcome to Efficiently-Productive',
        msg: 'Where being productive actually means something.',
        show: false,
        showEnter: true,
        second: false,
        userName: '',
        todaysEP: 0,
        totalEP: 0,
        showActModal: false,
        showEPModal: false,
        showHistory: false,
        tmpObj: {
          name: '',
          pts: 0,
          Odate: null,
          fireDate: null
        },
        actObj: {
          title: '',
          points: 0
        },
        actList: [],
        history: [],
        theDate: new Date().toLocaleDateString('en-US')
      }
    },
    created () {
      var pathA = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/points/total/points')
      pathA.on('value', snap => {
        this.totalEP = snap.val()
      })
      var pathB = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/points/today/points')
      pathB.on('value', snap => {
        this.todaysEP = snap.val()
      })
      var pathC = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/history/item')
      this.history = pathC
    },
    methods: {
      newAct: function () {
        this.showActModal = !this.showActModal
      },
      submitAndClose: function () {
        var path = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/myActs')
        path.child(this.actObj.title).set(
          {
            title: this.actObj.title,
            points: this.actObj.points
          }
        )
        this.actObj.title = ''
        this.actObj.points = 0
        this.newAct()
      },
      earnEP: function () {
        this.showEPModal = !this.showEPModal
      },
      submitEP: function () {
        this.earnEP()
        var pointsPath = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/points')
        var historyPath = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/history')
        var el = document.getElementById('A')
        var tmp = el.options[el.selectedIndex].value
        var splitRa = tmp.split(' ')
        var name = splitRa[0]
        var pts = splitRa[1]
        var date = this.theDate
        var fdate = firebase.database.ServerValue.TIMESTAMP
        this.tmpObj.name = name
        this.tmpObj.pts = pts
        this.tmpObj.Odate = date
        this.tmpObj.fireDate = fdate
        historyPath.push().child('item').set({
          date: this.tmpObj.Odate,
          points: this.tmpObj.pts,
          title: this.tmpObj.name,
          createdAt: this.tmpObj.fireDate
        })
        pts = parseInt(pts) // Change pts from string to int
        pointsPath.child('totalPoints').set(
          pts
        )
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
