import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import { handleAvatarClick } from './utils';
import { RESOURSES_URL } from '../../env';

class Avatar extends Block {
  constructor(props: { avatar?: string; editable: boolean }) {
    const classes = ['avatar'];
    if (props.editable) {
      classes.push('editable');
    }
    super('div', {
      ...props,
      src: `${RESOURSES_URL}${props.avatar}`,
      className: classes.join(' '),
      events: { click: (event) => handleAvatarClick(event) },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default Avatar;
