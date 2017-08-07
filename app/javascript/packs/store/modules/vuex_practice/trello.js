import * as types from '../../actions/trello-mutation-types'
import axios from 'axios'

// set csrf token by getting that from dom.
let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

export default {
  state: {
    lists: [
      { id: 1, order: 1, title: 'List1'},
      { id: 2, order: 2, title: 'List2'},
      { id: 3, order: 3, title: 'List3'},
    ],
  },
  getters: {
    nextId: (state, getters) => {
      let maxId = 0;
      state.lists.forEach((list) => {
        if(list.id > maxId) maxId = list.id;
      });
      return ++maxId;
    },
    nextOrder: (state, getters) => {
      return state.lists.length + 1;
    },
  },
  actions: {
    [types.ADD_LIST] ({ commit, getters }) {
      const newList = {
        id: getters.nextId,
        order: getters.nextOrder,
        title: `List${ getters.nextOrder }`
      };

      commit({
          type: types.ADD_LIST,
          data: newList
      });
    },
    [types.EDIT_LIST_TITLE] ({ commit }, newTodo) {
      commit({
          type: types.EDIT_LIST_TITLE,
          data: newTodo
      });
    },
  },
  mutations: {
    [types.ADD_LIST] (state, payload) {
      state.lists.push(payload.data);
    },
    [types.EDIT_LIST_TITLE] (state, payload) {
      state.lists.forEach((list, i) => {
        if(list.id === payload.data.id) {
          state.lists[i] = payload.data;
        }
      });
    },
  }
};
