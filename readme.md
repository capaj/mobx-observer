# mobx-observer

an observer decorator and factory for all your react-like components.

## Required methods

```
componentDidMount
componentWillUnmount
render
```

If your component has these lifecycle methods, mobx-observer will be able to subscribe/unsubscribe to changes on your mobx observables. Which means you can use this not only with react, but also with inferno, preact, react-lite.

For React, it is safer to use the official [mobx-react](https://github.com/mobxjs/mobx-react).

## Install
```
npm i mobx-observer -S
```

## Usage

### decorator
```javascript
import Component from 'inferno-component'
import {observer} from 'mobx-observer'

@observer
class Counter extends Component {
  render() {
    return (
      <div onClick={() => {
        state.val++
      }}>
        <span>Counter is at: { state.val }</span>
      </div>
    )
  }
}
```

### stateless component style
```javascript
import Component from 'inferno-component'
import {makeObserver, setComponent} from './observer'
setComponent(Component) // you only need to do this once, not for every component
// if you forget to setComponent, you will get this error: Super expression must either be null or a function, not undefined
const Counter = makeObserver((props) => {
  return (
      <div onClick={() => {
        state.val++
      }}>
        <h1>Header! {props.a}</h1>
        <span>Counter is at: { state.val }</span>
      </div>
    )
})
```

## Performance

Mobx-observer should be on par with mobx-react.
