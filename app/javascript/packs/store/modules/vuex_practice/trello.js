import * as types from '../../actions/trello-mutation-types'
import axios from 'axios'

// set csrf token by getting that from dom.
let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

export default {
  state: {
    lists: [
      { id: 1, order: 1, title: 'List1', cards: []},
      { id: 2, order: 2, title: 'List2', cards: []},
      { id: 3, order: 3, title: 'List3', cards: []},
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
        title: 'New List'
      };

      commit({
          type: types.ADD_LIST,
          data: newList
      });
    },
    [types.DELETE_LIST] ({ commit, getters }, list) {
      commit({
          type: types.DELETE_LIST,
          data: list
      });
    },
    [types.UPDATE_LIST] ({ commit }, newList) {
      commit({
          type: types.UPDATE_LIST,
          data: newList
      });
    },
    [types.ADD_CARD] ({ commit, getters }) {
      // const newList = {
      //   id: getters.nextId,
      //   order: getters.nextOrder,
      //   title: `List${ getters.nextOrder }`
      // };
      //
      // commit({
      //     type: types.ADD_LIST,
      //     data: newList
      // });
    },
  },
  mutations: {
    [types.ADD_LIST] (state, payload) {
      state.lists.push(payload.data);
    },
    [types.DELETE_LIST] (state, payload) {
      state.lists.forEach((list, i) => {
        if(list.id === payload.data.id) {
          state.lists.splice(i, 1,);
        }
      });
    },
    [types.UPDATE_LIST] (state, payload) {
      state.lists.forEach((list, i) => {
        if(list.id === payload.data.id) {
          // don't insert object to array like below
          // ex) state.lists[i] = payload.data
          // components life cycle do not work if you do so.
          state.lists.splice(i, 1, payload.data);
        }
      });
    },
    [types.ADD_CARD] (state, payload) {
      //state.lists.push(payload.data);
    },
  }
};
