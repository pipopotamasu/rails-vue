import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import assert from 'power-assert'
import sinon from 'sinon'
import Buttons from '../../../../app/javascript/packs/components/vuex_practice/buttons.vue'

Vue.use(Vuex);

describe('buttons.vue', () => {
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    actions = {
      ADD_LIST: sinon.stub(),
      SAVE: sinon.stub()
    }
    store = new Vuex.Store({
      state: { lists: [] },
      actions
    })

    wrapper = mount(Buttons, { store })
  })

  it('render elements', () => {
    assert(wrapper.find('button').length === 2);
  });

  describe('ADD_LIST', () => {
    it('ADD_LIST is called once.', () => {
      const addListButton = wrapper.find('button')[0]
      addListButton.trigger('click')
      assert(actions.ADD_LIST.calledOnce === true)
    })
  });

  describe('SAVE', () => {
    it('SAVE is called once.', () => {
      const saveButton = wrapper.find('button')[1]
      saveButton.trigger('click')
      assert(actions.SAVE.calledOnce === true)
    })
  });
});
