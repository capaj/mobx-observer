'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.observer = observer;
exports.setComponent = setComponent;
exports.makeObserver = makeObserver;

var _mobx = require('mobx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = void 0;

/**
 * Observer decorator
 */
function observer(componentClass) {
  if (componentClass.prototype.hasOwnProperty('componentDidMount')) {
    (function () {
      var originalDidMount = componentClass.prototype.componentDidMount;
      componentClass.prototype.componentDidMount = function () {
        var _this = this;

        this.disposer = (0, _mobx.autorun)(function () {
          _this.render();
          _this.forceUpdate();
        });
        originalDidMount();
      };
    })();
  } else {
    componentClass.prototype.componentDidMount = function () {
      var _this2 = this;

      this.disposer = (0, _mobx.autorun)(function () {
        _this2.render();
        _this2.forceUpdate();
      });
    };
  }
  if (componentClass.prototype.hasOwnProperty('componentWillUnmount')) {
    (function () {
      var originalUnmount = componentClass.prototype.componentWillUnmount;
      componentClass.prototype.componentWillUnmount = function () {
        this.disposer();
        originalUnmount();
      };
    })();
  } else {
    componentClass.prototype.componentWillUnmount = function () {
      this.disposer();
    };
  }
  return componentClass;
}

function setComponent(comp) {
  Component = comp;
}

function makeObserver(fn) {
  var Cl = function (_Component) {
    _inherits(Cl, _Component);

    function Cl() {
      _classCallCheck(this, Cl);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Cl).apply(this, arguments));
    }

    _createClass(Cl, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this4 = this;

        this.disposer = (0, _mobx.autorun)(function () {
          _this4.render();
          _this4.forceUpdate();
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return fn(this.props);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.disposer();
      }
    }]);

    return Cl;
  }(Component);

  return Cl;
}

//# sourceMappingURL=observer.js.map