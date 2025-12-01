import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import Avatar from '../../components/avatar';
import type { IChat } from '../../models/chat';
import { normalizeTime } from '../../utils/normalizeTime';

class ChatItem extends Block {
  constructor(props: { chat: IChat; onClick: () => void }) {
    const avatar = new Avatar({ editable: false });
    super('article', {
      ...props,
      events: { click: props.onClick },
      className: 'chat-item',
      avatar,
      lastMsgTime: normalizeTime(props.chat.last_message?.time),
    });
  }

  render(): DocumentFragment {
    return this.compile(template, { ...this.meta.props });
  }
}

export default ChatItem;
