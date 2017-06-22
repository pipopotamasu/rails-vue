import Vue from 'vue'
import TodoApp from './components/todo_app.vue'

Vue.component('todo-app', TodoApp)

// bootstrap the demo
var app = new Vue({
  el: '#app'
})
