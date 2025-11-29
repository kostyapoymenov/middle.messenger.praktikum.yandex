import Block from '../../core/block';
import template from './template.hbs?raw';
import ChatItem from '../../components/chatItem';
import MessageItem from '../../components/messageItem';
import Button from '../../components/button';
import { NOOP_CALLBACK } from '../../constants/noop';
import Form from '../../components/form';
import { validateMessage } from '../../utils/validators';
import { ROUTES } from '../../constants/routes';
import { createChat, fetchChats } from '../../services/chats';
import withStore from '../../core/store/utils';
import type { IAppState } from '../../core/store/types';
import type { IChat } from '../../models/chat';
import { initWs } from '../../services/messages';
import type { IMessage } from '../../models/message';
import type { IUser } from '../../models/user';
import chatInfo from '../../components/chatInfo';
import { normalizeTime } from '../../utils/normalizeTime';
import { userName } from '../../utils/userName';
import './styles.scss';

class ChatsPage extends Block {
  sendMessage?: (message: string) => void;
  disconnect?: () => void;

  constructor() {
    const profileButton = new Button({
      text: 'Профиль',
      icon: 'fa-user',
      events: { click: () => window.router.go(ROUTES.profile) },
    });
    const createNewChat = new Button({
      text: 'Новый чат',
      icon: 'fa-plus',
      events: {
        click: () => {
          const title = prompt('Введите название чата');
          if (title) {
            createChat(title);
          }
        },
      },
    });
    const attachButton = new Button({
      icon: 'paperclip',
      events: { click: NOOP_CALLBACK },
    });
    const form = new Form({
      classNames: 'message-form',
      fields: [
        {
          placeholder: 'Введите сообщение...',
          name: 'message',
          validationFn: validateMessage,
        },
      ],
      submitButton: { text: undefined, icon: 'arrow-right' },
      events: {
        submit: (event) => {
          event.preventDefault();
          (form.children.fileds as Block[]).forEach((block) => {
            (block.children.inputField as Block).getElement()?.blur();
          });
          if (event.currentTarget) {
            const messageForm = event.currentTarget as HTMLFormElement;
            const message = new FormData(messageForm).get('message') as string;
            messageForm.reset();
            this.sendMessage?.(message);
          }
        },
      },
    });

    super('div', {
      className: 'chats-page',
      profileButton,
      attachButton,
      form,
      createNewChat,
    });
    this.loadChats();
  }

  render() {
    const chats: IChat[] = (this.meta.props.chats ?? []) as IChat[];
    const messages: IMessage[] = (this.meta.props.messages ?? []) as IMessage[];
    const selectedChatUsers: IUser[] = (this.meta.props.selectedChatUsers ??
      []) as IUser[];
    const user: IUser = this.meta.props.user as IUser;
    this.children['chatItems'] = chats.map(
      (chat) =>
        new ChatItem({
          chat,
          onClick: () => {
            this.disconnect?.();
            initWs(chat.id).then(({ sendMessage, disconnect }) => {
              this.sendMessage = sendMessage;
              this.disconnect = disconnect;
              this.children['chatInfo'] = new chatInfo();
            });
          },
        })
    );
    this.children['messageItems'] = messages.map((item) => {
      return new MessageItem({
        ...item,
        userName: userName(user, selectedChatUsers, item),
        time: normalizeTime(item.time),
      });
    });
    return this.compile(template, this.meta.props);
  }

  async loadChats() {
    await fetchChats();
  }
}

const mapStateToProps = ({
  chats,
  messages,
  selectedChat,
  selectedChatUsers,
  user,
}: Partial<IAppState>) => ({
  chats,
  messages,
  selectedChat,
  selectedChatUsers,
  user,
});

export default withStore(ChatsPage, mapStateToProps);
