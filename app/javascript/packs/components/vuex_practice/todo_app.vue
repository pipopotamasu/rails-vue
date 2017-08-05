<template>
  <div id="todo">
      <ul>
          <todo v-for="todo in todo.todos" :todo="todo" :key="todo.id"></todo>
      </ul>
      <div>
          <input type="text" v-model="inputTitle">
          <button @click="ADD_TASK(inputTitle), resetInput()">追加</button>
      </div>
  </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex'
import * as types from '../../store/actions/todo-mutation-types';
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
