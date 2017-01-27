import React, { PropTypes, Component } from 'react';
import Localizer from '../src/localizer';
import renderer from 'react-test-renderer';

test('Localizer', () => {

  class DummyComponent extends Component {
    render() {
      expect(typeof this.context.translator).toBe('object');
      expect(typeof this.context.locale).toBe('string');
      return null
    }
  }

  DummyComponent.contextTypes = {
    locale: PropTypes.string,
    translator: PropTypes.object
  };

  renderer.create(
    <Localizer locale='cy'>
      <DummyComponent />
    </Localizer>
  );

});
