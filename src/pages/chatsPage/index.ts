import Block from '../../core/block';
import template from './template.hbs?raw';
import chatItemsMock from '../../mock/chatItems';
import ChatItem from '../../components/chatItem';
import messageItemsMock from '../../mock/messageItems';
import MessageItem from '../../components/messageItem';
import Button from '../../components/button';
import { NOOP_CALLBACK } from '../../constants/noop';
import Form from '../../components/form';
import { validateMessage } from '../../utils/validators';
import './styles.scss';

class ChatsPage extends Block {
  constructor() {
    const chatItems = chatItemsMock.map((item) => new ChatItem(item));
    const messageItems = messageItemsMock.map((item) => new MessageItem(item));
    const profileButton = new Button({ text: 'Профиль', icon: 'fa-user' });
    const attachButton = new Button({ icon: 'paperclip', events: { click: NOOP_CALLBACK } });
    const form = new Form({
      classNames: 'message-form',
      fields: [
        { placeholder: 'Введите сообщение...', name: 'message', validationFn: validateMessage },
      ],
      submitButton: { text: undefined, icon: 'arrow-right' },
      events: {
        submit: (event) => {
          event.preventDefault();
          (form.children.fileds as Block[]).forEach((block) => {
            (block.children.inputField as Block).getElement()?.blur();
          });
          if (event.currentTarget) {
            console.log(
              Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement).entries())
            );
          }
        },
      },
    });

    super('div', {
      className: 'chats-page',
      chatItems,
      messageItems,
      profileButton,
      attachButton,
      form,
    });
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChatsPage;
