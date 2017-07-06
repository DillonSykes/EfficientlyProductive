<template>
  <div style="height:300px;overflow:auto;">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Date</th>
        <th>Activity</th>
        <th>Points</th>
      </tr>
      </thead>
      <tbody>
      <slot name="data"></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'DataView',
    data () {
      return {}
    }
  }
</script>
<style>

</style>
