import fs from 'fs';
import gettextParser from 'gettext-parser';
import Translator from './translator';

const translatorFactory = (locale) => {

  // TODO: Translation file loading
  // Always load from localeDir/<locale>/LC_MESSAGES/messages.mo
  //const filePath = path.resolve(localeDir, locale, 'LC_MESSAGES', 'messages.mo');
  //const moFile = fs.readFileSync(moFile, 'utf-8');
  //const { translations } = moFile;

  const translator = new Translator(locale);

  return translator;

}

export default translatorFactory;
