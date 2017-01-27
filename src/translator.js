import GettextMixin from './gettext';

class NullTranslator {

  constructor(locale) {
    this._locale = locale;
  }

  get locale() {
    return this._locale;
  }

  translate(message) {
    return message;
  }

  pluralize(singular, plural, number) {
    return this.translate((number != 1) ? singular : plural);
  }

}

class Translator extends NullTranslator {

  constructor(locale, translations = {}) {
    super(locale);
    this._translations = translations;
  }

  _lookup(message, context) {
    if (this._translations[context] && this._translations[context][message]) {
      return this._translations[context][message];
    }

    return false;
  }

  translate(message, { context = '' } = {}) {
    const defaultMessage = message;
    const translation = this._lookup(message, context);

    if (translation) {
      return translation.msgstr[0];
    }

    return defaultMessage;
  }

  pluralize(singular, plural, number, { context = '' } = {}) {
    const defaultMessage = super.pluralize(singular, plural, number);
    const translation = this._lookup(singular, context);

    if (translation) {
      const index = (number != 1) ? 1 : 0;
      return translation.msgstr[index] || defaultMessage;
    }

    return defaultMessage;
  }

}

class GettextTranslator extends GettextMixin(Translator) {
}

export { NullTranslator };
export { Translator };
export default GettextTranslator;
