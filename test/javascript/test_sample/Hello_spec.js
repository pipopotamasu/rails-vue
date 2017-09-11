import Hello from '../../../app/javascript/packs/components/test_sample/Hello.vue'
import { mount } from 'avoriaz'
import assert from 'power-assert'

describe('Hello.vue', () => {
  it('mount', () => {
    const wrapper = mount(Hello, {
      propsData: {
        user: {nickname: 'John'}
      }
    });
    assert(wrapper.contains('img') === true);
  })
})
