import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'avoriaz'
import assert from 'power-assert'
import sinon from 'sinon'
import Card from '../../../../app/javascript/packs/components/vuex_practice/card.vue'

Vue.use(Vuex);

describe('card.vue', () => {
  let actions;
  let store;
  let wrapper;
  let props;

  beforeEach(() => {
    actions = {
      UPDATE_CARD: sinon.stub(),
      UPDATING: sinon.stub(),
      DONE_UPDATE: sinon.stub(),
      DELETE_CARD: sinon.stub()
    }
    store = new Vuex.Store({
      state: {},
      actions
    });

    props = {
      card: { id: 1, name: 'test', list_id: 1, order: 0 },
      pdating: false
    }

    wrapper = mount(Card, { store, propsData: props })
  })

  it('render elements', () => {
    assert(wrapper.contains('input') === true);
    assert(wrapper.contains('span') === true);
    assert(wrapper.contains('i') === true);
    assert(wrapper.vm.editing === false)
    assert(wrapper.first('input').value() === 'test');
    assert(wrapper.first('input').hasStyle('display', 'none') === true);
    assert(wrapper.first('span').text() === 'test');
    assert(wrapper.first('span').hasStyle('display', 'none') === false);
    assert(wrapper.first('i').hasStyle('display', 'none') === false);
  });

  describe('onEditing', () => {
    it('editing is true.', () => {
      const span = wrapper.first('span')
      span.trigger('click')
      assert(wrapper.vm.editing === true);
      assert(wrapper.first('input').hasStyle('display', 'none') === false);
      assert(wrapper.first('span').hasStyle('display', 'none') === true);
    });
  });

  describe('doneEdit', () => {
    describe('when blur', () => {
      beforeEach(() => {
        const input = wrapper.first('input');
        input.trigger('blur')
      });

      it('UPDATING is called once.', () => {
        assert(actions.UPDATING.calledOnce === true);
      });

      it('editing is false', () => {
        assert(wrapper.vm.editing === false);
      });

      it('DONE_UPDATE is called once.', () => {
        assert(actions.DONE_UPDATE.calledOnce === true);
      });
    });

    describe('when keyup.enter', () => {
      beforeEach(() => {
        const input = wrapper.first('input');
        input.trigger('keyup.enter');
      });

      it('UPDATING is called once.', () => {
        assert(actions.UPDATING.calledOnce === true)
      });

      it('DONE_UPDATE is called once.', () => {
        assert(actions.DONE_UPDATE.calledOnce === false)
      });
    });
  });
});
