import Vue from 'vue'
import Vuex from 'vuex'
import todo from './modules/vuex_practice/todo'
import counter from './modules/vuex_practice/counter'
import trello from './modules/vuex_practice/trello'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todo: todo,
    counter: counter,
    trello: trello
  }
});
