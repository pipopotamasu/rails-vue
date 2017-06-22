<!-- demo root element -->
<template>
  <div id="todo-app">
    <input v-model="input" type="text" size="20"/><button v-on:click="addTodo">Submit</button>
    <ul>
      <li v-for="todo in todos">
        <input v-model="todo.checked"type="checkbox" v-bind:id="'todo-' + todo.id" />
        <label v-bind:class="{ done: todo.checked }" v-bind:for="'todo-' + todo.id">{{ todo.body }}</label>
      </li>
    </ul>
    <!-- <form id="search">
      Search <input name="query" v-model="searchQuery">
    </form>
    <grid
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </grid> -->
  </div>
</template>

<script>
import axios from 'axios'

// set csrf token by getting that from dom.
let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

export default {
  template: '#todo-app',
  data: function () {
    return {
      input: '',
      todos: [],
    }
  },
  methods: {
    addTodo: function() {
      if(this.input == 0) return false;
      this.createTodo(this.input);
      this.todos.push({id: this.todos.length + 1, body: this.input, checked: false});
      this.input = '';
    },
    createTodo: function(input) {
      axios.post('/todos', {
        body: input
      }).then((response) => {
        console.log(response);
      }).catch((e) => {
        console.log(e);
      });
    },
  }
}
</script>

<style scoped>
.done {
  text-decoration: line-through
}
</style>
