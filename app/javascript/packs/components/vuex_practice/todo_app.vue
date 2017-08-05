<template>
  <div id="todo">
      <ul>
          <item v-for="todo in todo.todos" :item="todo" :key="todo.id"></item>
      </ul>
      <div>
          <input type="text" v-model="inputTitle">
          <button @click="ADD_TASK(inputTitle), resetInput()">追加</button>
      </div>
  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex'
import * as types from '../../store/actions/mutation-types';
import Todo from './todo.vue'

export default {
  components: {
    Todo
  },
  data () {
    return {
        inputTitle: ""
    }
  },
  computed: {
    // share store state
    ...mapState(['todo']),
    // ...mapGetters(['nextId'])
  },
  methods: {
    // share store action
    ...mapActions([
        types.ADD_TASK
    ]),
    resetInput: function() {
      this.inputTitle = ''
    },
  }
}
</script>
