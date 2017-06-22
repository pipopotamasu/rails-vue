<!-- demo root element -->
<template>
  <div id="todo-app">
    <input v-model="input" type="text" size="20"/><button v-on:click="addTodo">Submit</button>
    <ul>
      <li v-for="todo in todos">
        <input type="checkbox" v-bind:id="'todo-' + todo.id" /> {{ todo.body }}<label v-bind:for="'todo-' + todo.id">チェックしてください</label>
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
      this.todos.push({id: this.todos.length + 1, body: this.input});
      this.input = '';
    }
  }
}
</script>
