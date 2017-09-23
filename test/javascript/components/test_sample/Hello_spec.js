import Hello from '../../../../app/javascript/packs/components/test_sample/Hello.vue'
import { mount } from 'avoriaz'
import assert from 'power-assert'

describe('Hello.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Hello, {
      propsData: {
        user: { nickname: 'John' }
      }
    });
  });

  it('mount', () => {
    assert(wrapper.contains('img') === true);
  })

  it('data', () => {
    let msg = 'Hello World'
    wrapper.setData({ msg: msg })
    assert(wrapper.find('h1')[0].text() === msg)
    assert(wrapper.data().msg === msg)
  })

  it('find', () => {
    assert(wrapper.find('h2').length === 2)
    assert(wrapper.find('h2')[0].is('h2') === true)
    assert(wrapper.find('h3')[0].text() === 'nickname: John')
  })

  // NOTE: avoriaz has not prefer to use hasAttribute method. Instead of that, use getAttribute method.
  // it('hasAttribute', () => {
  //   assert(wrapper.hasAttribute('id', 'hello') === true)
  // })

  it('getAttribute', () => {
    assert(wrapper.getAttribute('id') === 'hello')
  })

  // NOTE: Important Method!!!!!!!
  it('instance', () => {
    assert(wrapper.instance().hello() === 'world')
    assert(wrapper.instance().msg === 'Welcome to Your Vue.js App')
  })

  it('text', () => {
    assert(wrapper.find('h1')[0].text() === 'Welcome to Your Vue.js App')
  })

  // NOTE: Important Method!!!!!!!
  it('vm', () => {
    assert(wrapper.vm.user.nickname === 'John')
    // access to data
    assert(wrapper.vm.msg === 'Welcome to Your Vue.js App')
    // access to method
    assert(wrapper.vm.hello() === 'world')
  })

  it('tag selectors', () => {
    // Designate tag.
    const div = wrapper.find('div')[0]
    assert(div.is('div') === true)

    // Designate child tag
    const img1 = wrapper.find('div img')[0]
    assert(img1.is('img') === true)

    // Designate child tag
    const img2 = wrapper.find('div > img')[0]
    assert(img2.is('img') === true)
  })

  it('id selectors', () => {
    const hello = wrapper.find('#hello')[0]
    assert(hello.is('div') === true)
  })

  it('class selectors', () => {
    const subtitle = wrapper.find('.subtitle')[0]
    assert(subtitle.is('h2') === true)
  })

  it('attribute selectors', () => {
    const src1 = wrapper.find('[src]')[0]
    assert(src1.is('img') === true)

    const src2 = wrapper.find('[src="http://vuejs.org/images/logo.png"]')[0]
    assert(src1.is('img') === true)

    // it is ok enclose doble quotation.
    const src3 = wrapper.find("[src='http://vuejs.org/images/logo.png']")[0]
    assert(src1.is('img') === true)
  })
})
