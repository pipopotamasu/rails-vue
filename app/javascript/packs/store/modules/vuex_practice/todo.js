import * as types from '../../actions/todo-mutation-types'

export default {
  state: {
    todos: [
      { id: 1, is_do: false, title: 'タスク1'},
      { id: 2, is_do: true, title: 'タスク2'},
      { id: 3, is_do: false, title: 'タスク3'}
    ],
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
      state.todos.push(payload.data);
    },
    [types.DONE_TASK] (state, payload) {
      state.todos.forEach((todo, i) => {
        if(todo.id === payload.data.id) {
          state.todos[i] = payload.data
        }
      });
    },
  }
};
