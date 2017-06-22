<!-- demo root element -->
<template>
  <div id="grid-app">
    <form id="search">
      Search <input name="query" v-model="searchQuery">
    </form>
    <grid
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </grid>
  </div>
</template>

<script>
const apiURL = 'http://localhost:5000/grids/grid_user';

export default {
  template: '#grid-app',
  data: function () {
    return {
      searchQuery: '',
      gridColumns: ['name', 'power'],
      gridData: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 }
      ]
    }
  },
  methods: {
    fetchData: function() {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open('GET', apiURL);
      xhr.onload = function () {
        console.log(xhr.responseText)
        self.gridData = JSON.parse(xhr.responseText)
      }
      xhr.send()
    }
  },
  created: function() {
    this.fetchData();
  },
}
</script>
