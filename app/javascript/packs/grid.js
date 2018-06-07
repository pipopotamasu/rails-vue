/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> and
// <%= stylesheet_pack_tag 'hello_vue' %> to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue'
import GridApp from '../components/vue_practice/grid_app.vue'

Vue.component('grid-app', GridApp)

// bootstrap the demo
var app = new Vue({
  el: '#app'
})
