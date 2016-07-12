import {autorun} from 'mobx'
let Component

/**
 * Observer decorator
 */
export function observer (componentClass) {
  if (componentClass.prototype.hasOwnProperty('componentDidMount')) {
    const originalDidMount = componentClass.prototype.componentDidMount
    componentClass.prototype.componentDidMount = function () {
      this.disposer = autorun(() => {
        this.render()
        this.forceUpdate()
      })
      originalDidMount.call(this)
    }
  } else {
    componentClass.prototype.componentDidMount = function () {
      this.disposer = autorun(() => {
        this.render()
        this.forceUpdate()
      })
    }
  }
  if (componentClass.prototype.hasOwnProperty('componentWillUnmount')) {
    const originalUnmount = componentClass.prototype.componentWillUnmount
    componentClass.prototype.componentWillUnmount = function () {
      this.disposer()
      originalUnmount.call(this)
    }
  } else {
    componentClass.prototype.componentWillUnmount = function () {
      this.disposer()
    }
  }
  return componentClass
}

export function setComponent (comp) {
  Component = comp
}

export function makeObserver (fn) {
  class Cl extends Component {
    componentDidMount () {
      this.disposer = autorun(() => {
        this.render()
        this.forceUpdate()
      })
    }
    render () {
      return fn(this.props)
    }
    componentWillUnmount () {
      this.disposer()
    }
  }
  return Cl
}
