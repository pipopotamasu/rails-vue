import Vue from 'vue'
import TodoApp from './components/todo_app.vue'
import Todo from './components/todo.vue'
import Sortable from 'vue-sortable'


Vue.use(Sortable)
Vue.component('todo-app', TodoApp)
Vue.component('todo', Todo)

// bootstrap the demo
var app = new Vue({
  el: '#app'
})
