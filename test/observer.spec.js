import test from 'ava'
import {observer, makeObserver, setComponent} from '../observer'
import {observable} from 'mobx'

const nop = () => {}

test('observer autoruns, disposes when unmounted', (t) => {
  const state = observable({
    val: 0
  })

  let c = 0;
// eslint-disable-next-line
  @observer
  class MyComponent {
    render() {
      nop(state.val)
    }
    forceUpdate() {
      c++
    }
  }

  const inst = new MyComponent()

  inst.componentDidMount()
  t.is(c, 1)
  state.val++
  t.is(c, 2)
  inst.componentWillUnmount()
  state.val++
  t.is(c, 2)
})

test('should throw before a component is set', (t) => {
  t.throws(() => {
    makeObserver(() => {})
  }, /Super expression must either be null or a function, not undefined/)
})

test('makeObserver makes stateless function into observer', (t) => {
  let c = 0;
  const state = observable({
    val: 0
  })

  class Component {
    render() {
      nop(state.val)
    }
    forceUpdate() {
      c++
    }
  }
  setComponent(Component)

  const Cl = makeObserver(() => {
    nop(state.val)
  })

  const inst = new Cl()

  inst.componentDidMount()
  t.is(c, 1)
  state.val++
  t.is(c, 2)
  inst.componentWillUnmount()
  state.val++
  t.is(c, 2)
})
