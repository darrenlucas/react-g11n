import Translator from '../src/translator';

test('Translator', () => {
  expect(typeof Translator).toBe('function');
});

test('translate', () => {
  const translator = new Translator('en');
  expect(translator.translate('message')).toBe('message');
});

test('locale', () => {
  const translator = new Translator('cy');
  expect(translator.locale).toBe('cy');
});

test('translate with translations', () => {
  const translations = {
    '': {
      'hello': {
        'msgid': 'hello',
        'msgstr': ['bonjour']
      }
    }
  };
  const translator = new Translator('fr', translations);
  expect(translator.translate('hello')).toBe('bonjour');
});

test('pluralize with translations', () => {
  const translations = {
    '': {
      'apple': {
        'msgid': 'apple',
        'msgid_plural': 'apples',
        'msgstr': ['pomme', 'pommes']
      }
    }
  }

  const translator = new Translator('fr', translations);
  expect(translator.pluralize('apple', 'apples', 1)).toBe('pomme');
  expect(translator.pluralize('apple', 'apples', 2)).toBe('pommes');
});
