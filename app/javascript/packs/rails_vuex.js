import Vue from 'vue'
import VueRouter from 'vue-router'
import Counter from './components/counter.vue'
import store from './store/counter.js';

Vue.use(VueRouter)

const routes = [
  { path: '/counter', component: Counter }
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
