import Vue from 'vue'
import TodoApp from './components/vue_practice/todo_app.vue'
import Sortable from 'vue-sortable'


Vue.use(Sortable)
Vue.component('todo-app', TodoApp)

// bootstrap the demo
var app = new Vue({
  el: '#app'
})
