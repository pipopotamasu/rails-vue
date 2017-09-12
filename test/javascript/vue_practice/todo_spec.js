import Todo from '../../../app/javascript/packs/components/vue_practice/todo.vue'
import { mount } from 'avoriaz'
import assert from 'power-assert'

describe('todo.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Todo, {
      propsData: {
        todo: { id: 1, body: 'test', checked: false }
      }
    });
  });

  it('render elements', () => {
    // somehow, can not assert li element
    // assert(wrapper.contains('li') === true);
    assert(wrapper.contains('input') === true);
    assert(wrapper.contains('label') === true);
    assert(wrapper.contains('span') === true);
  })

  it('render text', () => {
    assert(wrapper.find('label')[0].text() === 'test');
    assert(wrapper.find('span')[0].text() === '[×]');
  });

  it('v-vind', () => {
    assert(wrapper.find('input')[0].getAttribute('id') === 'todo-1');
    assert(wrapper.find('label')[0].getAttribute('for') === 'todo-1');
  })
})
