let GettextMixin = (superclass) => class extends superclass {

  _translate(message) {
    if (super.translate) {
      return super.translate.apply(this, arguments);
    }
    return message;
  }

  _pluralize(singular, plural, number) {
    if (super.pluralize) {
      return super.pluralize.apply(this, arguments);
    }
    return this._translate((number != 1) ? singular : plural);
  }

  /**
   * Translate a string using the current domain.
   *
   * @param {String} message String to be translated
   * @return {String} translated string
   */
  gettext(message) {
    return this._translate(message);
  }

  /**
   * Translate a string using the specified domain.
   *
   * @param {String} domain The domain to use
   * @param {String} message String to be translated
   * @return {String} translated string
   */
  dgettext(domain, message) {
    return this._translate(message, { domain: domain });
  }

  /**
   * Translate a string taking into consideration plural forms.
   * Some languages have more than two plural forms.
   *
   * @param {String} singular Singular form string to be translated
   * @param {String} plural Plural form string to be translated
   * @param {Number} number Number for the plural
   * @return {String} translated string
   */
  ngettext(singular, plural, number) {
    return this._pluralize(singular, plural, number);
  }

  /**
   * Translate a string taking into consideration plural forms using
   * the specified domain
   *
   * @param {String} domain The domain to use
   * @param {String} singular Singular form string to be translated
   * @param {String} plural Plural form string to be translated
   * @param {Number} number Number for the plural
   * @return {String} translated string
   */
  dngettext(domain, singular, plural, number) {
    return this._pluralize(singular, plural, number, { domain: domain });
  }

  /**
   * Translate a string for the specified context using the current domain.
   *
   * @param {String} context Translation context
   * @param {String} message String to be translated
   * @return {String} translated string
   */
  pgettext(context, message) {
    return this._translate(message, { context: context });
  }

  /**
   * Translate a string using the specified domain and context
   *
   * @param {String} domain The domain to use
   * @param {String} context Translation context
   * @param {String} message String to be translated
   * @return {String} translated string
   */
  dpgettext(domain, context, message) {
    return this._translate(message, { domain: domain, context: context });
  }

  /**
   * Translate a string for the specified context taking into consideration
   * plural forms.
   *
   * @param {String} context Translation context
   * @param {String} singular Singular form string to be translated
   * @param {String} plural Plural form string to be translated
   * @param {Number} number Number for the plural
   * @return {String} translated string
   */
  npgettext(context, singular, plural, number) {
    return this._pluralize(singular, plural, number, { context: context });
  }

  /**
   * Translate a string for the specified domain and  context taking into
   * consideration plural forms.
   *
   * @param {String} domain The domain to use
   * @param {String} context Translation context
   * @param {String} singular Singular form string to be translated
   * @param {String} plural Plural form string to be translated
   * @param {Number} number Number for the plural
   * @return {String} translated string
   */
  dnpgettext(domain, context, singular, plural, number) {
    return this._pluralize(singular, plural, number, { domain: domain, context: context });
  }

}

export default GettextMixin;
