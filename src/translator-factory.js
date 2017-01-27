import path from 'path';
import fs from 'fs';
import gettextParser from 'gettext-parser';
import Translator from './translator';

const translatorFactory = (locale, { localeDir = './locale' } = {}) => {

  var translations = {};

  // TODO: Currently only a domain of 'messages' is supported
  const filePath = path.resolve(localeDir, locale, 'LC_MESSAGES', 'messages.mo');

  if (fs.existsSync(filePath)) {
    const moFile = fs.readFileSync(filePath);
    var { translations } = gettextParser.mo.parse(moFile, 'utf-8');
  }

  const translator = new Translator(locale, translations);

  return translator;

}

export default translatorFactory;
