import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import assert from 'power-assert'
import sinon from 'sinon'
import Counter from '../../../app/javascript/packs/components/vuex_practice/counter.vue'

Vue.use(Vuex)

describe('counter.vue', () => {
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      INCREMENT: sinon.stub(),
      DECREMENT: sinon.stub(),
      RESET: sinon.stub()
    }
    store = new Vuex.Store({
      state: { counter: 0 },
      actions
    })

    wrapper = mount(Counter, { store })
  })

  it('render elements', () => {
    assert(wrapper.contains('p') === true);
    assert(wrapper.contains('div') === true);
    assert(wrapper.contains('button') === true);
  })

  describe('INCREMENT()', () => {
    it('INCREMENT is called once.', () => {
      const input = wrapper.find('button')[0]
      input.trigger('click')
      assert(actions.INCREMENT.calledOnce === true)
    })
  });

  describe('DECREMENT()', () => {
    it('DECREMENT is called once.', () => {
      const input = wrapper.find('button')[1]
      input.trigger('click')
      assert(actions.DECREMENT.calledOnce === true)
    })
  });

  describe('RESET()', () => {
    it('RESET is called once.', () => {
      const input = wrapper.find('button')[2]
      input.trigger('click')
      assert(actions.RESET.calledOnce === true)
    })
  });
});
