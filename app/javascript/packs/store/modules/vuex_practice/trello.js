import * as types from '../../actions/trello-mutation-types'
import axios from 'axios'

// set csrf token by getting that from dom.
let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
axios.defaults.headers.common['X-CSRF-Token'] = token
axios.defaults.headers.common['Accept'] = 'application/json'

export default {
  state: {
    lists: [
      { id: 1, order: 1, title: 'List1', cards: [ { id: 1, list_id: 1, order: 1, name: 'Task1' }, { id: 2, list_id: 1, order: 2, name: 'Task2' } ]},
      { id: 2, order: 2, title: 'List2', cards: []},
      { id: 3, order: 3, title: 'List3', cards: []},
    ]
  },
  getters: {
    nextListId: (state, getters) => {
      let maxId = 0;
      state.lists.forEach((list) => {
        if(list.id > maxId) maxId = list.id;
      });
      return ++maxId;
    },
    nextListOrder: (state, getters) => {
      return state.lists.length + 1;
    },
    nextCardId: (state, getters) => (listOrder) => {
      let maxId = 0;
      state.lists[listOrder - 1].cards.forEach((card) => {
        if(card.id > maxId) maxId = card.id;
      });
      return ++maxId;
    },
    nextCardOrder: (state, getters) => (listOrder) => {
      return state.lists[listOrder - 1].cards.length + 1;
    },
  },
  actions: {
    [types.ADD_LIST] ({ commit, getters }) {
      const newList = {
        id: getters.nextListId,
        order: getters.nextListOrder,
        title: 'New List',
        cards: []
      };

      commit({
          type: types.ADD_LIST,
          data: newList
      });
    },
    [types.SORT_LIST_ORDER] ({ commit }) {
      commit({
          type: types.SORT_LIST_ORDER
      });
    },
    [types.SORT_CARD] ({ commit}, list) {
      commit({
          type: types.SORT_CARD
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
    [types.UPDATE_CARD] ({ commit }, newCard) {
      commit({
          type: types.UPDATE_CARD,
          data: newCard
      });
    },
    [types.ADD_CARD] ({ commit, getters }, list) {
      const newCard = {
        id: getters.nextCardId(list.order),
        list_id: list.id,
        order: getters.nextCardOrder(list.order),
        name: 'New Task'
      };

      commit({
          type: types.ADD_CARD,
          data: newCard
      });
    },
  },
  mutations: {
    [types.ADD_LIST] (state, payload) {
      state.lists.push(payload.data);
    },
    [types.SORT_LIST_ORDER] (state, payload) {
      state.lists.forEach((list, i) => {
        state.lists[i].order = i + 1;
      });
    },
    [types.SORT_CARD] (state, payload) {
      state.lists.forEach((list, l_i) => {
        list.cards.forEach((card, c_i) => {
          state.lists[l_i].cards[c_i].list_id = list.id;
          state.lists[l_i].cards[c_i].order = c_i + 1;
        });
      });
    },
    [types.DELETE_LIST] (state, payload) {
      state.lists.some((list, i) => {
        if(list.id === payload.data.id) {
          state.lists.splice(i, 1);
          return true;
        }
      });

      // Set new order
      state.lists.forEach((list, i) => {
        state.lists[i].order = i + 1;
      });
    },
    [types.UPDATE_LIST] (state, payload) {
      state.lists.some((list, i) => {
        if(list.id === payload.data.id) {
          // don't insert object to array like below
          // ex) state.lists[i] = payload.data
          // components life cycle do not work if you do so.
          state.lists.splice(i, 1, payload.data);
          return true;
        }
      });
    },
    [types.UPDATE_CARD] (state, payload) {
      console.log(1);
      state.lists.some((list, i) => {
        if(list.id === payload.data.list_id) {
          state.lists[i].cards.splice(payload.data.card_order - 1, 1, payload.data);
          return true;
        }
      });
    },
    [types.ADD_CARD] (state, payload) {
      state.lists.some((list, i) => {
        if(list.id === payload.data.list_id) {
          state.lists[i].cards.push(payload.data);
          return true;
        }
      });
    },
  }
};
