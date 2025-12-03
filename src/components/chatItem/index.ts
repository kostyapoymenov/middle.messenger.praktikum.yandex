import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import Avatar from '../../components/avatar';
import type { IChat } from '../../models/chat';
import { normalizeTime } from '../../utils/normalizeTime';
import { updateAvatar } from '../../services/chats';

class ChatItem extends Block {
  constructor(props: { chat: IChat; onClick: () => void }) {
    const avatar = new Avatar({
      avatar: props.chat.avatar,
      editable: true,
      callBack: (file: File) => updateAvatar(file, props.chat.id),
    });
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
