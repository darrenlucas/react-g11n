import { Component, PropTypes, Children } from 'react';
import translatorFactory from './translator-factory';

class Localizer extends Component {

  getChildContext() {
    const { locale } = this.props;
    return {
      locale: locale,
      translator: translatorFactory(locale)
    };
  }

  render() {
    return Children.only(this.props.children);
  }

}

Localizer.propTypes = {
  children: PropTypes.node,
  locale: PropTypes.string.isRequired,
};

Localizer.childContextTypes = {
  translator: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Localizer;
