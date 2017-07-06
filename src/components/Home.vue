<template>
  <div class="Home">
    <modal v-if="showHistory">
      <h1 slot="header" class="modal-title">
        History
      </h1>

      <div slot="body">
        <DataView>
            <tr slot="data" v-for="act in this.historyRef">
              <th> {{ act.item.date }} </th>
              <td> {{ act.item.title }} </td>
              <td> {{ act.item.points }} </td>
            </tr>
        </DataView>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-outline-info" @click=" historyBtn()"> Close </button>
        <button type="button" class="btn btn-danger" @click="resetHistory()" style="float: left"> Clear all history</button>
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
        <div class="panel-body">
          <table class="table table-striped">
            <thead>
            <tr>
              <th>Title</th>
              <th>Points</th>
              <th>Earn</th>
              <th> Delete </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="act in activities">
              <td>{{act.title}}</td>
              <td>{{act.points}}</td>
              <td>
                <span class="glyphicon glyphicon-plus" v-on:click="submitEP(act)"></span>
              </td>
              <td>
                <span class="glyphicon glyphicon-trash" v-on:click="deleteItem(act)"></span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-outline-info" @click="earnEP()"> Close </button>
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
          <button type="button" class="btn btn-primary btn-lg" @click="historyBtn(this.history)">History</button>
        </div>
      </div>
      <div class="alert alert-info" role="alert">
        <strong>
          <p class="text-center">Total EP: {{ this.totalEP }} </p>
          <p class="text-center">Today's EP: !!COMING SOON!! </p>
        </strong>
      </div>
    </div>

  </div>
</template>

<script>
  import modal from '@/components/modal.vue'
  import DataView from '@/components/DataView.vue'
  import firebase from 'firebase'
  import toastr from 'toastr'

export default {
    name: 'Home',
    firebase () {
      const userId = firebase.auth().currentUser.uid
      return {
        activities: firebase.database().ref('users/' + userId + '/myActs'),
        pointsRef: firebase.database().ref('users/' + userId + '/points'),
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
      var pathA = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/points/total')
      pathA.on('value', snap => {
        this.totalEP = snap.val()
      })
      var pathB = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/points/today')
      pathB.on('value', snap => {
        this.todaysEP = snap.val()
      })
    },
    methods: {
      newAct: function () {
        this.showActModal = !this.showActModal
      },
      submitAndClose: function () {
        var path = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/myActs')
        if (Number.isNaN(this.actObj.points)) { // is not a number
          toastr.error('Please enter a number')
        } else { // is a number

        }
        path.child(this.actObj.title + ' ' + this.actObj.points).set(
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
      submitEP: function (act) {
        this.earnEP()
        var pointsPath = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/points')
        var historyPath = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/history')
        var name = act.title
        var pts = act.points
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
        pts = parseInt(pts) // Change pts from string to int *** may not need anymore ***
        pts = pts + this.totalEP
        pointsPath.child('total').set(
          pts
        )
      },
      historyBtn: function (anArray) {
        this.showHistory = !this.showHistory
      },
      getItemFromSelectList: function (id) {
        var el = document.getElementById(id)
        return el.options[el.selectedIndex].value
      },
      deleteItem: function (act) {
        var actPath = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/myActs')
        actPath.child(act['.key']).remove()
        toastr.success(act.title + ' was removed from list of activities')
      },
      resetHistory: function () {
        if (window.confirm('Are you sure you want to proceed, History will be deleted FOREVER!')) {
          var historyPath = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/history')
          historyPath.remove()
          toastr.success('History Deleted!')
        } else {
          toastr.info('Delete Action Cancelled!')
        }
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
