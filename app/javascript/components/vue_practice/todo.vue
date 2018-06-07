<!-- demo root element -->
<template>
  <li class="list-group-item">
    <input v-model="todo.checked" type="checkbox" v-bind:id="'todo-' + todo.id" />
    <label v-bind:class="{ done: todo.checked }" v-bind:for="'todo-' + todo.id">{{ todo.body }}</label>
    <span v-on:click="deleteTodo(todo.id)" class="delete">[×]</span>
  </li>
</template>

<script>
import axios from 'axios'

// set csrf token by getting that from dom.
if (document.getElementsByName('csrf-token')[0]) {
  let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
  axios.defaults.headers.common['X-CSRF-Token'] = token
  axios.defaults.headers.common['Accept'] = 'application/json'
}

export default {
  // template: '#todo-app',
  props: {
    todo: Object,
    fetchData: Function,
  },
  methods: {
    deleteTodo: function(id) {
      self = this
      axios.delete('/todos/' + id, {
        id: id
      }).then((response) => {
        self.fetchData();
        console.log(response);
      }).catch((e) => {
        console.log(e);
      });
    }
  }
}
</script>

<style scoped>
.done {
  text-decoration: line-through
}

li {
  cursor: pointer;
}
</style>
