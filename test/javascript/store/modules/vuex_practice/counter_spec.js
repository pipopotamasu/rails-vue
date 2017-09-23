import assert from 'power-assert'
import store from '../../../../../app/javascript/packs/store/modules/vuex_practice/counter'

let mutations = store.mutations;

describe('store', () => {
  describe('mutations', () => {
    it('INCREMENT', () => {
      // mock state
      const state = { count: 0 }
      mutations.INCREMENT(state);
      // 結果を検証する
      assert(state.count === 1)
    });

    it('DECREMENT', () => {
      // mock state
      const state = { count: 1 }
      mutations.DECREMENT(state);
      // 結果を検証する
      assert(state.count === 0)
    });

    it('RESET', () => {
      // mock state
      const state = { count: 2 }
      mutations.RESET(state);
      // 結果を検証する
      assert(state.count === 0)
    });
  });
})
