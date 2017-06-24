<!-- demo root element -->
<template>
  <div id="todo-app">
    <input v-model="input" type="text" size="20"/><button v-on:click="addTodo">Submit</button>
    <ul>
      <template v-for="todo in todos">
        <todo
          :todo="todo"
          :fetchData="fetchData">
        </todo>
      </template>
    </ul>
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
  created: function() {
    this.fetchData();
  },
  methods: {
    addTodo: function() {
      if(this.input == 0) return false;
      this.createTodo(this.input);
      this.fetchData();
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
    fetchData: function() {
      let self = this;
      axios.get('/todos/all').then((response) => {
        self.todos = response.data
      }).catch((e) => {
        console.log(e)
      });
    },
  }
}
</script>
