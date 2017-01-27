import GettextMixin from '../src/gettext';

class DummyTranslator  {

  translate(message, { domain, context } = {}) {
    return [domain, context, message].filter(n => n).join(':');
  }

  pluralize(singular, plural, number, { domain, context } = {}) {
    const isPlural = (number != 1);
    let message = singular;

    if (isPlural) {
      message = plural;
    }

    return this.translate(message, { domain: domain, context: context });
  }

}

class Gettext extends GettextMixin(DummyTranslator) {
}

test('GettextMixin', () => {
  expect(typeof GettextMixin).toBe('function');
});

test('gettext', () => {
  const gettext = new Gettext();
  expect(gettext.gettext('message')).toBe('message');
});

test('dgettext', () => {
  const gettext = new Gettext();
  expect(gettext.dgettext('domain', 'message')).toBe('domain:message');
});

test('ngettext for singular', () => {
  const gettext = new Gettext();
  expect(gettext.ngettext('singular', 'plural', 1)).toBe('singular');
});

test('ngettext for plural', () => {
  const gettext = new Gettext();
  expect(gettext.ngettext('singular', 'plural', 2)).toBe('plural');
});

test('dngettext for singular', () => {
  const gettext = new Gettext();
  expect(gettext.dngettext('domain', 'singular', 'plural', 1)).toBe('domain:singular');
});

test('dngettext for plural', () => {
  const gettext = new Gettext();
  expect(gettext.dngettext('domain', 'singular', 'plural', 2)).toBe('domain:plural');
});

test('pgettext', () => {
  const gettext = new Gettext();
  expect(gettext.pgettext('context', 'message')).toBe('context:message');
});

test('dpgettext', () => {
  const gettext = new Gettext();
  expect(gettext.dpgettext('domain', 'context', 'message')).toBe('domain:context:message');
});

test('npgettext for singular', () => {
  const gettext = new Gettext();
  expect(gettext.npgettext('context', 'singular', 'plural', 1)).toBe('context:singular');
});

test('npgettext for plural', () => {
  const gettext = new Gettext();
  expect(gettext.npgettext('context', 'singular', 'plural', 2)).toBe('context:plural');
});

test('dnpgettext for singular', () => {
  const gettext = new Gettext();
  expect(gettext.dnpgettext('domain', 'context', 'singular', 'plural', 1)).toBe('domain:context:singular');
});

test('dnpgettext for plural', () => {
  const gettext = new Gettext();
  expect(gettext.dnpgettext('domain', 'context', 'singular', 'plural', 2)).toBe('domain:context:plural');
});
