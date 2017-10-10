import * as types from '../actions/trello-mutation-types'
import Vue from 'vue'

export default {
  [types.ADD_LIST] (state, payload) {
    Vue.set(state.lists, payload.list.order, payload.list);
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
    Vue.delete(state.lists, payload.list.order);
    // Set new order
    state.lists.forEach((list, i) => {
      state.lists[i].order = i;
    });
  },
  [types.UPDATE_LIST] (state, payload) {
    // don't assign object to array like below
    // ex) state.lists[i] = payload.data
    // components life cycle do not work if you do so.
    Vue.set(state.lists, payload.list.order, payload.list);
  },
  [types.UPDATE_CARD] (state, payload) {
    Vue.set(state.lists[payload.list_index].cards, payload.card.order, payload.card);
  },
  [types.DELETE_CARD] (state, payload) {
    Vue.delete(state.lists[payload.list_index].cards, payload.card.order);

    // Set new order
    state.lists[payload.list_index].cards.forEach((card, i) => {
      state.lists[payload.list_index].cards[i].order = i;
    });
  },
  [types.ADD_CARD] (state, payload) {
    Vue.set(state.lists[payload.list_index].cards, payload.card.order, payload.card);
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
