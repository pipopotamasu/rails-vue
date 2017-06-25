import Vue from 'vue'
import VueRouter from 'vue-router'
import Sortable from 'vue-sortable'
import Grid from './components/grid.vue'
import GridApp from './components/grid_app.vue'
import Todo from './components/todo.vue'
import TodoApp from './components/todo_app.vue'

Vue.use(VueRouter)
Vue.use(Sortable)
Vue.component('grid', Grid)
//Vue.component('grid-app', GridApp)
Vue.component('todo', Todo)
//Vue.component('todo-app', TodoApp)

const routes = [
  { path: '/grid', component: GridApp },
  { path: '/todo', component: TodoApp }
]

const router = new VueRouter({
  routes
})

// bootstrap the demo
var app = new Vue({
  el: '#app',
  router
})
