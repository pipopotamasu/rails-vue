import TodoApp from '../../../app/javascript/packs/components/vue_practice/todo_app.vue'
import { mount, shallow } from 'avoriaz'
import assert from 'power-assert'
import axios from 'axios';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('todo_app.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(TodoApp);
  });

  it('render elements', () => {
    assert(wrapper.contains('input') === true);
  })

  describe('fetchData()', () => {
    it('fetch via api and assign data', (done) => {
      let todos = [
        { id: 1, body: 'test1', checked: false },
        { id: 2, body: 'test2', checked: false },
      ];

      let resolved = new Promise.resolve({
        data: todos
      });

      let stub = sinon.stub(axios, 'get').returns(resolved);
      wrapper.vm.fetchData();
      resolved.then(() => {
        assert(wrapper.vm.todos === todos);
        done();
      }).catch(done);
    });
  });

  // it('render text', () => {
  //   assert(wrapper.find('label')[0].text() === 'test');
  //   assert(wrapper.find('span')[0].text() === '[×]');
  // });
  //
  // it('render v-vind', () => {
  //   assert(wrapper.find('input')[0].getAttribute('id') === 'todo-1');
  //   assert(wrapper.find('label')[0].getAttribute('for') === 'todo-1');
  // })
})
