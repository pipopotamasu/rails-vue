import * as types from '../../mutation_types/trello'
import mutations from '../../mutations/trello'
import actions from '../../actions/trello'
import getters from '../../getters/trello'
import Vue from 'vue'

export default {
  state: {
    lists: [],
    updating: false
  },
  getters: getters,
  actions: actions,
  mutations: mutations
};
