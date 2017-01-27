import React, { PropTypes, Component } from 'react';
import Localizer from '../src/localizer';
import localize from '../src/localize';
import renderer from 'react-test-renderer';

test('localize', () => {
  expect(typeof localize).toBe('function');
});

test('localize passes translator object', () => {

  const DummyComponent = ({ translator: t }) => {
    expect(typeof t).toBe('object')
    expect(t.gettext('foo')).toBe('foo');
    return <div />
  }

  const LocalizedDummyComponent = localize(DummyComponent)

  renderer.create(
    <Localizer locale='cy'>
      <LocalizedDummyComponent />
    </Localizer>
  )

});
