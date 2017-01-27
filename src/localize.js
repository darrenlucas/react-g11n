import React, { Component, PropTypes } from 'react';

const localize = (ComponentToWrap) => {

  class LocalizeComponent extends Component {

    render() {
      const { translator } = this.context;
      return (
        <ComponentToWrap {...this.props} translator={translator} />
      );
    }

  }

  LocalizeComponent.contextTypes = {
      translator: PropTypes.object.isRequired
  };

  return LocalizeComponent;

};

export default localize;
