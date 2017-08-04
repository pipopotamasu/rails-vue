import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '../actions/mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    items: [
        {is_do: false, title: 'タスク1'},
        {is_do: true, title: 'タスク2'},
        {is_do: false, title: 'タスク3'}
    ]
  },
  actions: {
    [types.ADD_TASK] ({ commit }, title) {
        let newItem = {
            title: title,
            is_do: false
        }
        commit({
            type: types.ADD_TASK,
            data: newItem
        })
    },
    [types.DONE_TASK] ({ commit }, item) {
        commit({
            type: types.DONE_TASK,
            data: item
        })
    }
  },
  mutations: {
    [types.ADD_TASK] (state, payload) {
      state.items.push(payload.data);
    },
    [types.DONE_TASK] (state, payload) {
      let index = state.items.indexOf(payload.data)
      state.items[index].is_do = !payload.data.is_do
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
