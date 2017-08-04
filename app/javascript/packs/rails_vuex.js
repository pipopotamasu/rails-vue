import Vue from 'vue'
import VueRouter from 'vue-router'
import Counter from './components/counter.vue'
import TodoApp from './components/todo_app_vuex.vue'
import store from './store';

Vue.use(VueRouter)

const routes = [
  { path: '/counter', component: Counter },
  { path: '/todo', component: TodoApp }
]

const router = new VueRouter({
  routes
})

// bootstrap the demo
var app = new Vue({
  store,
  el: '#app',
  router
})
