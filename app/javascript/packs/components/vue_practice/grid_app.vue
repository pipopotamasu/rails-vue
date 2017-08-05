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
import axios from 'axios'

export default {
  template: '#grid-app',
  data: function () {
    return {
      searchQuery: '',
      gridColumns: ['name', 'power'],
      gridData: []
    }
  },
  methods: {
    fetchData: function() {
      let self = this;
      axios.get('/grids/grid_user').then((response) => {
        self.gridData = response.data
      }).catch((e) => {
        console.log(e)
      });
    }
  },
  created: function() {
    this.fetchData();
  },
}
</script>
