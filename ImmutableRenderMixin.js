
"use strict";

var shallowEqualImmutable = require('./shallowEqualImmutable');

var ImmutableRenderMixin = {
  shouldComponentUpdate: function(nextProps, nextState) {
    // https://github.com/rackt/react-router/issues/866
    // so our <Link> components are always re-rendered with a route change
    if (this.context.router) {
      const changed = this.pureComponentLastPath !== this.context.router.getCurrentPath();
      this.pureComponentLastPath = this.context.router.getCurrentPath();
      if (changed) return true;
    }
    
    return !shallowEqualImmutable(this.props, nextProps) ||
           !shallowEqualImmutable(this.state, nextState);
  }
};

module.exports = ImmutableRenderMixin;
