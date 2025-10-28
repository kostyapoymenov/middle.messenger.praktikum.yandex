import Block from '../../core/block';
import template from './template.hbs?raw';
import type { INavigationProps } from './types';
import { prepareLinks } from './utils';
import './styles.scss';

class Navigation extends Block {
  constructor(props: Partial<INavigationProps> = {}) {
    const links = prepareLinks(props);
    super('nav', { ...props, className: 'nav', links });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default Navigation;
