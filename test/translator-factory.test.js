import translatorFactory from '../src/translator-factory';

const options = {
  localeDir: './test/fixtures/locale'
}

test('translatorFactory', () => {
  const translator = translatorFactory('fr', options);
  expect(translator.translate('hello')).toBe('bonjour');
});

test('translatorFactory with missing locale', () => {
  const translator = translatorFactory('es', options);
  expect(translator.translate('hello')).toBe('hello');
});
