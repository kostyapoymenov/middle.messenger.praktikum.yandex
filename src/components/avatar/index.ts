import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { IAvatarProps } from './types';
import { handleAvatarClick } from './utils';

class Avatar extends Block {
  constructor(props: IAvatarProps) {
    const classes = ['avatar'];
    if (props.editable) {
      classes.push('editable');
    }
    super('div', {
      ...props,
      className: classes.join(' '),
      events: { click: (event) => handleAvatarClick(event) },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default Avatar;
