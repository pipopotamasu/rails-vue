<template>
  <div id="todo">
      <ul>
          <todo v-for="todo in todo.todos" :todo="todo" :key="todo.id"></todo>
      </ul>
      <div>
          <input type="text" v-model="inputBody">
          <button @click="ADD_TASK(inputBody), resetInput()">Submit</button>
      </div>
  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex'
import * as types from '../../store/mutation_types/todo';
import Todo from './todo.vue'

export default {
  components: {
    Todo
  },
  data () {
    return {
        inputBody: ""
    }
  },
  created: function() {
    this.FETCH_TODOS();
  },
  computed: {
    // share store state
    ...mapState(['todo']),
    // ...mapGetters(['nextId'])
  },
  methods: {
    // share store action
    ...mapActions([
        types.ADD_TASK,
        types.FETCH_TODOS
    ]),
    resetInput: function() {
      this.inputBody = ''
    },
  }
}
</script>
