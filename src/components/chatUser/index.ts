import Block from '../../core/block';
import template from './template.hbs?raw';
import type { IUser } from '../../models/user';
import Link from '../../components/link';

class ChatUser extends Block {
  constructor(props: { user: IUser; onDelete: (user: IUser) => void }) {
    const user = new Link({
      text: `${props.user.login} x`,
      events: {
        click: (event) => {
          event.preventDefault();
          const remove = confirm(`Удалить из чата: ${props.user.login}`);
          if (remove) {
            props.onDelete?.(props.user);
          }
        },
      },
    });

    super('div', { className: 'chat-user', user });
  }

  render(): DocumentFragment {
    return this.compile(template, this.meta.props);
  }
}

export default ChatUser;
