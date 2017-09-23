import TodoApp from '../../../app/javascript/packs/components/vue_practice/todo_app.vue'
import { mount, shallow } from 'avoriaz'
import assert from 'power-assert'
import axios from 'axios';
import sinon from 'sinon';
import Promise from 'bluebird';

describe('todo_app.vue', () => {
  let wrapper;
  before(() => {
    wrapper = mount(TodoApp);
  });

  it('render elements', () => {
    assert(wrapper.contains('input') === true);
  })

  describe('created', () => {
    let todos, resolved, stub;
    before(() => {
      todos = [
        { id: 1, body: 'test1', checked: false },
        { id: 2, body: 'test2', checked: false },
      ];

      resolved = new Promise.resolve({
        data: todos
      });

      stub = sinon.stub(axios, 'get').returns(resolved);
      wrapper.vm.fetchData();
    });

    describe('render input value', () => {
      before(() => {
        wrapper.setData( { input: 'test' } );
      });

      it('data is rendered on input box.', () => {
        assert(wrapper.find('input')[0].value() === 'test');
      });
    });

    describe('fetchData()', () => {
      it('fetched data is assigned to data object.', (done)=> {
        resolved.then(() => {
          assert(wrapper.vm.todos === todos);
          done();
        }).catch(done);
      });

      it('render 2 lists', () => {
        assert(wrapper.find('li').length === 2);
      });
    });

    describe('addTodo()', () => {
      beforeEach(() => {
        sinon.spy(wrapper.vm, "createTodo");
        sinon.spy(wrapper.vm, "fetchData");
        wrapper.find('button')[0].trigger('click')
        // wrapper.vm.addTodo();
      });

      afterEach(() => {
        wrapper.vm.createTodo.restore();
        wrapper.vm.fetchData.restore();
      });

      describe('In case of input value is blank', () => {
        before(() => {
          wrapper.setData( { input: '' } );
        });

        it('createTodo do not call.', (done)=> {
          assert(wrapper.vm.createTodo.notCalled === true);
          done();
        });
      });

      describe('In case of input value is not blank ', () => {
        before(() => {
          wrapper.setData( { input: 'test' } );
        });

        it('createTodo() call once.', (done)=> {
          assert(wrapper.vm.createTodo.calledOnce === true);
          done();
        });

        it('initialize input value.', (done)=> {
          assert(wrapper.vm.input === '');
          done();
        });
      });
    });
  });
})
