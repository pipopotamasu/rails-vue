import * as types from '../../actions/trello-mutation-types'
import axios from 'axios'

// set csrf token by getting that from dom.
if(document.getElementsByName('csrf-token')[0]) {
  let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
  axios.defaults.headers.common['X-CSRF-Token'] = token
  axios.defaults.headers.common['Accept'] = 'application/json'
}

export default {
  state: {
    lists: [],
    updating: false
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
      return state.lists.length;
    },
    nextCardId: (state, getters) => (listOrder) => {
      let maxId = 0;
      state.lists[listOrder].cards.forEach((card) => {
        if(card.id > maxId) maxId = card.id;
      });
      return ++maxId;
    },
    nextCardOrder: (state, getters) => (listOrder) => {
      return state.lists[listOrder].cards.length;
    },
    getListIndexByListId: (state, getters) => (listId) => {
      let targetIndex = 0;
      state.lists.some((list, i) => {
        if(list.id === listId) {
          targetIndex = i;
          return true;
        }
      });

      return targetIndex;
    }
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
          list: newList
      });
    },
    [types.SORT_LIST_ORDER] ({ commit }) {
      commit({
          type: types.SORT_LIST_ORDER
      });
    },
    [types.SORT_CARD] ({ commit }, list) {
      commit({
          type: types.SORT_CARD
      });
    },
    [types.DELETE_LIST] ({ commit }, list) {
      commit({
          type: types.DELETE_LIST,
          list: list
      });
    },
    [types.UPDATE_LIST] ({ commit }, newList) {
      commit({
          type: types.UPDATE_LIST,
          list: newList
      });
    },
    [types.UPDATE_CARD] ({ commit, getters }, newCard) {
      commit({
          type: types.UPDATE_CARD,
          card: newCard,
          list_index: getters.getListIndexByListId(newCard.list_id)
      });
    },
    [types.DELETE_CARD] ({ commit, getters }, card) {
      commit({
          type: types.DELETE_CARD,
          card: card,
          list_index: getters.getListIndexByListId(card.list_id)
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
          card: newCard,
          list_index: list.order
      });
    },
    [types.UPDATING] ({ commit }) {
      commit({
          type: types.UPDATING
      });
    },
    [types.DONE_UPDATE] ({ commit }) {
      commit({
          type: types.DONE_UPDATE
      });
    },
    [types.SAVE] ({ state }) {
      // format for server side
      const lists = state.lists.map((list) => { return Object.assign(list, { cards_attributes: list.cards }) });
      axios.post('/lists', {
        lists: lists
      }).then((response) => {
        alert('Success to save!');
      }).catch((e) => {
        alert('Faild to save.');
        console.log(e);
      });
    },
    [types.FETCH_DATA] ({ commit }) {
      axios.get('/lists/all').then((response) => {
        commit({
            type: types.FETCH_DATA,
            lists: response.data
        })
      }).catch((e) => {
        alert('Faild to get data.');
        console.log(e);
      });
    },
  },
  mutations: {
    [types.ADD_LIST] (state, payload) {
      state.lists.push(payload.list);
    },
    [types.SORT_LIST_ORDER] (state, payload) {
      state.lists.forEach((list, i) => {
        state.lists[i].order = i;
      });
    },
    [types.SORT_CARD] (state, payload) {
      state.lists.forEach((list, l_i) => {
        list.cards.forEach((card, c_i) => {
          state.lists[l_i].cards[c_i].list_id = list.id;
          state.lists[l_i].cards[c_i].order = c_i;
        });
      });
    },
    [types.DELETE_LIST] (state, payload) {
      state.lists.splice(payload.list.order, 1);
      // Set new order
      state.lists.forEach((list, i) => {
        state.lists[i].order = i;
      });
    },
    [types.UPDATE_LIST] (state, payload) {
      // don't assign object to array like below
      // ex) state.lists[i] = payload.data
      // components life cycle do not work if you do so.
      state.lists.splice(payload.list.order, 1, payload.list);
    },
    [types.UPDATE_CARD] (state, payload) {
      state.lists[payload.list_index].cards.splice(payload.card.order, 1, payload.card);
    },
    [types.DELETE_CARD] (state, payload) {
      state.lists[payload.list_index].cards.splice(payload.card.order, 1);

      // Set new order
      state.lists[payload.list_index].cards.forEach((card, i) => {
        state.lists[payload.list_index].cards[i].order = i;
      });
    },
    [types.ADD_CARD] (state, payload) {
      state.lists[payload.list_index].cards.push(payload.card);
    },
    [types.UPDATING] (state, payload) {
      state.updating = true;
    },
    [types.DONE_UPDATE] (state, payload) {
      state.updating = false;
    },
    [types.FETCH_DATA] (state, payload) {
      state.lists = payload.lists;
    },
  }
};
