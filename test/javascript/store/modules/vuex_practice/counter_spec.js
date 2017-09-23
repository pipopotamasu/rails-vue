import assert from 'power-assert'
import store from '../../../../../app/javascript/packs/store/modules/vuex_practice/counter'
import sinon from 'sinon'

const mutations = store.mutations;
const actions = store.actions;


describe('store', () => {
  describe('mutations', () => {
    it('INCREMENT', () => {
      // mock state
      const state = { count: 0 }
      mutations.INCREMENT(state);
      assert(state.count === 1)
    });

    it('DECREMENT', () => {
      // mock state
      const state = { count: 1 }
      mutations.DECREMENT(state);
      assert(state.count === 0)
    });

    it('RESET', () => {
      // mock state
      const state = { count: 2 }
      mutations.RESET(state);
      assert(state.count === 0)
    });
  });

  describe('actions', () => {
    it('INCREMENT', () => {
      let context = {
        commit: sinon.stub()
      }

      const state = { count: 0 };
      const expectedType = { type: 'INCREMENT' };
      actions.INCREMENT(context);
      assert(context.commit.withArgs(expectedType).callCount === 1);
    });

    it('DECREMENT', () => {
      let context = {
        commit: sinon.stub()
      }

      const state = { count: 0 };
      const expectedType = { type: 'DECREMENT' };
      actions.DECREMENT(context);
      assert(context.commit.withArgs(expectedType).callCount === 1);
    });

    it('RESET', () => {
      let context = {
        commit: sinon.stub()
      }

      const state = { count: 0 };
      const expectedType = { type: 'RESET' };
      actions.RESET(context);
      assert(context.commit.withArgs(expectedType).callCount === 1);
    });
  });
})
