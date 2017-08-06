import * as types from '../../actions/todo-mutation-types'
import axios from 'axios'

export default {
  state: {
    todos: [],
  },
  getters: {
    nextId: (state, getters) => {
      let maxId = 0;
      state.todos.forEach((todo) => {
        if(todo.id > maxId) maxId = todo.id;
      });
      return ++maxId;
    }
  },
  actions: {
    // [types.ADD_TASK] (context, title) { // context has getters, state, commit, dispatch, rootGetters
    //   let newTodo = {
    //     id: context.getters.nextId,
    //     title: title,
    //     is_do: false,
    //   }
    //   context.commit({
    //       type: types.ADD_TASK,
    //       data: newTodo
    //   })
    // },
    [types.ADD_TASK] ({ commit, getters }, title) {
      let newTodo = {
        id: getters.nextId,
        title: title,
        is_do: false,
      }
      commit({
          type: types.ADD_TASK,
          data: newTodo
      })
    },
    [types.DONE_TASK] ({ commit }, todo) {
      todo.checked = !todo.checked
      commit({
          type: types.DONE_TASK,
          data: todo
      })
    },
    [types.FETCH_TODOS] ({ commit }) {
      axios.get('/todos/all').then((response) => {
        console.log(response.data);
        commit({
            type: types.FETCH_TODOS,
            data: response.data
        })
      }).catch((e) => {
        console.log(e)
      });
    }
  },
  mutations: {
    [types.ADD_TASK] (state, payload) { // payload・・・nimotsu
      state.todos.push(payload.data);
    },
    [types.DONE_TASK] (state, payload) {
      state.todos.forEach((todo, i) => {
        if(todo.id === payload.data.id) {
          state.todos[i] = payload.data
        }
      });
    },
    [types.FETCH_TODOS] (state, payload) {
      state.todos = payload.data;
    },
  }
};
