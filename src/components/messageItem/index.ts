import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import type { IMessage } from '../../models/message';

class MessageItem extends Block {
  constructor(props: Partial<IMessage>) {
    super('div', {
      ...props,
      className: `message-item ${props.userName !== 'Вы' ? 'left' : 'right'}`,
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default MessageItem;
