import Block from '../../core/block';
import template from './template.hbs?raw';
import Link from '../../components/link';
import type { IErroPageProps } from './types';
import './styles.scss';

class ErrorPage extends Block {
  constructor(props: Partial<IErroPageProps>) {
    const homeLink = new Link({
      text: 'На главную',
      events: { click: (event): void => event.preventDefault() },
    });
    super('div', { ...props, className: 'error-page', homeLink });
  }

  render(): DocumentFragment {
    return this.compile(template, this.meta.props);
  }
}

export default ErrorPage;
