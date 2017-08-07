import * as types from '../../actions/todo-mutation-types'
import axios from 'axios'

// set csrf token by getting that from dom.
let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

export default {
  state: {
    todos: [],
  },
  // getters: {
  //   nextId: (state, getters) => {
  //     let maxId = 0;
  //     state.todos.forEach((todo) => {
  //       if(todo.id > maxId) maxId = todo.id;
  //     });
  //     return ++maxId;
  //   }
  // },
  actions: {
    // NOTE: Sync ADD_TASK
    // [types.ADD_TASK] (context, body) { // context has getters, state, commit, dispatch, rootGetters
    //   let newTodo = {
    //     id: context.getters.nextId,
    //     body: body,
    //     checked: false,
    //   }
    //   context.commit({
    //       type: types.ADD_TASK,
    //       data: newTodo
    //   })
    // },
    [types.ADD_TASK] ({ commit, getters}, body) {
      axios.post('/todos', {
        body: body
      }).then((response) => {
        commit({
          type: types.ADD_TASK,
          data: response.data
        })
      }).catch((e) => {
        console.log(e);
      });
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
        commit({
            type: types.FETCH_TODOS,
            data: response.data
        })
      }).catch((e) => {
        console.log(e)
      });
    },
    [types.DELETE_TASK] ({ commit }, todo) {
      axios.delete('/todos/' + todo.id, {
        id: todo.id
      }).then((response) => {
        commit({
            type: types.DELETE_TASK,
            data: todo
        })
      }).catch((e) => {
        console.log(e);
      });
    },
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
    [types.DELETE_TASK] (state, payload) {
      state.todos.forEach((todo, i) => {
        if(todo.id === payload.data.id) {
          state.todos.splice(i, 1);
        }
      });
    },
  }
};
