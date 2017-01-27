import { Component, PropTypes, Children } from 'react';
import translatorFactory from './translator-factory';

class Localizer extends Component {

  getChildContext() {
    const { locale, localeDir } = this.props;
    return {
      locale: locale,
      translator: translatorFactory(locale, { localeDir: localeDir })
    };
  }

  render() {
    return Children.only(this.props.children);
  }

}

Localizer.propTypes = {
  children: PropTypes.node,
  locale: PropTypes.string.isRequired,
  localeDir: PropTypes.string
};

Localizer.defaultProps = {
  localeDir: 'locale'
};

Localizer.childContextTypes = {
  translator: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Localizer;
