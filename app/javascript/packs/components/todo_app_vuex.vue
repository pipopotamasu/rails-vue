<template>
  <div id="todo">
      <ul>
          <item v-for="item in items" :item="item" :key="item.id"></item>
      </ul>
      <div>
          <input type="text" v-model="inputTitle">
          <button @click="ADD_TASK(inputTitle)">追加</button>
      </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import * as types from '../actions/mutation-types';
import Item from './todo_vuex.vue'

export default {
    name: 'todo',
    components: {
        Item
    },
    data () {
        return {
            inputTitle: ""
        }
    },
    computed: {
        ...mapState(['items'])
    },
    methods: {
        ...mapActions([
            types.ADD_TASK
        ]),
    }
}
</script>
