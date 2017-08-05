<!-- component template -->
<template>
  <table id="grid-template">
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData">
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  // template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
  },
  data: function () {
    let sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      let sortKey = this.sortKey
      let filterKey = this.filterKey && this.filterKey.toLowerCase()
      let order = this.sortOrders[sortKey] || 1
      let data = this.data
      if (filterKey) {
        // return filter data by using indexOf
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }

      return data
    }
  },
  filters: {
    // capitalize -> start initial char by the capital. ex) name -> Name
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  mthods: {
    sortBy: function(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
</script>
