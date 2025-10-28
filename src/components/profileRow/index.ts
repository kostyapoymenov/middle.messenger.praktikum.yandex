import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { IProfileRowProps } from './types';

class ProfileRow extends Block {
  constructor(props: Partial<IProfileRowProps> = {}) {
    super('div', {
      ...props,
      className: 'profile-row',
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default ProfileRow;
