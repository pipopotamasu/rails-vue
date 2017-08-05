import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '../actions/mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    todos: [
        { id: 1, is_do: false, title: 'タスク1'},
        { id: 2, is_do: true, title: 'タスク2'},
        { id: 3, is_do: false, title: 'タスク3'}
    ],
  },
  actions: {
    [types.ADD_TASK] ({ commit }, title) {
        let newItem = {
            title: title,
            is_do: false,
        }
        commit({
            type: types.ADD_TASK,
            data: newItem
        })
    },
    [types.DONE_TASK] ({ commit }, item) {
        item.is_do = !item.is_do
        commit({
            type: types.DONE_TASK,
            data: item
        })
    }
  },
  mutations: {
    [types.ADD_TASK] (state, payload) { // payload・・・nimotsu
      const todo = Object.assign(payload.data, { id: state.todos.length })
      state.todos.push(todo);
    },
    [types.DONE_TASK] (state, payload) {
      state.todos[payload.data.id] = payload.data
    },
    increment(state) {
      if (state.count < 100) {
        state.count += 1;
      }
    },
    decrement(state) {
      if (state.count > 0) {
        state.count += -1;
      }
    },
    reset(state) {
      state.count = 0;
    }
  }
});
