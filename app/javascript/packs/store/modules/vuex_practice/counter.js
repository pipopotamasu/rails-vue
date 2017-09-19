import * as types from '../../actions/counter-mutation-types'

export default {
  state: {
    count: 0,
  },
  actions: {
    [types.INCREMENT] ({ commit }){
      console.log(1111111); 
      commit({
        type: types.INCREMENT
      });
    },
    [types.DECREMENT] ({ commit }){
      commit({
        type: types.DECREMENT
      });
    },
    [types.RESET] ({ commit }){
      commit({
        type: types.RESET
      });
    },
  },
  mutations: {
    [types.INCREMENT] (state, payload) {
      state.count += 1;
    },
    [types.DECREMENT] (state, payload) {
      state.count -= 1;
    },
    [types.RESET] (state, payload) {
      state.count = 0;
    },
  }
}
