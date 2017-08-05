<!-- demo root element -->
<template>
  <div id="todo-app">
    <input v-model="input" type="text" size="20"/><button v-on:click="addTodo">Submit</button>
    <ul class="list-group" v-sortable="options">
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
import Todo from './todo.vue'

// set csrf token by getting that from dom.
let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

export default {
  // template: '#todo-app',
  components: {
    Todo
  },
  data: function () {
    return {
      input: '',
      todos: [],
      options: {
        animation: 500,
        onSort: this.sorted
      }
    }
  },
  created: function() {
    this.fetchData();
  },
  methods: {
    addTodo: function() {
      if(this.input == 0) return false;
      this.createTodo(this.input).then(() => {
        this.fetchData();
      });
      this.input = '';
    },
    createTodo: function(input) {
      return axios.post('/todos', {
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
    sorted: function() {
      console.log('sorted');
    }
  }
}
</script>
