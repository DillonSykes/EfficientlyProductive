<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th>Date</th>
      <th>Activity</th>
      <th>Points</th>
    </tr>
    </thead>
    <tbody>
    <slot name="name"></slot>
    </tbody>
  </table>

</template>

<script>
  export default {
    name: 'DataView',
    data () {
      return {}
    }
  }
</script>
