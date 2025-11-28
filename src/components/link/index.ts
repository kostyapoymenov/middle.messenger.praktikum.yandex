import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { ILinkProps } from './types';

class Link extends Block {
  constructor(props: Partial<ILinkProps> = {}) {
    super('a', {
      ...props,
      className: 'my-link',
      attrs: { href: props.href ?? '' },
    });
  }
  public render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default Link;
