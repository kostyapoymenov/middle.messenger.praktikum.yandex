import Block from '../../core/block';
import template from './template.hbs?raw';
import './styles.scss';
import Button from '../../components/button';
import withStore from '../../core/store/utils';
import type { IAppState } from '../../core/store/types';
import { addUserToChat, deleteUserFromChat } from '../../services/chats';
import type { IUser } from '../../models/user';
import ChatUser from '../chatUser';
import type { IChat } from '../../models/chat';
import InputModal from '../inputModal';

class ChatInfo extends Block {
  constructor() {
    const addUserModal = new InputModal({
      isOpen: false,
      title: 'Добавить пользователя',
      placeholder: 'Введите логин пользователя',
      submitText: 'Добавить',
      cancelText: 'Отмена',
      onClose: () => {
        addUserModal.setProps({ isOpen: false });
      },
      onSubmit: (login: string) => {
        const selectedChat = this.meta.props.selectedChat as IChat;
        if (selectedChat && login.trim()) {
          addUserToChat(login.trim(), selectedChat.id);
        }
      },
      validationFn: (value: string) => {
        if (!value.trim()) {
          return 'Логин обязателен';
        }
        if (value.trim().length < 3) {
          return 'Логин должен быть не менее 3 символов';
        }
        return '';
      },
    });

    const addUserBtn = new Button({
      icon: 'fa-plus',
      text: 'Добавить',
      events: {
        click: () => {
          addUserModal.setProps({ isOpen: true });
        },
      },
    });

    super('aside', {
      className: 'chat-aside',
      addUserBtn,
    });

    this.children['addUserModal'] = addUserModal;
  }

  render(): DocumentFragment {
    const selectedChatUsers: IUser[] = (this.meta.props.selectedChatUsers ??
      []) as IUser[];
    const selectedChat: IChat = this.meta.props.selectedChat as IChat;
    this.children['users'] = selectedChatUsers.map(
      (user) =>
        new ChatUser({
          user,
          onDelete: (user) => deleteUserFromChat(user.id, selectedChat.id),
        })
    );
    return this.compile(template, this.meta.props);
  }
}

const mapStateToProps = ({
  selectedChatUsers,
  selectedChat,
}: Partial<IAppState>) => ({
  selectedChatUsers,
  selectedChat,
});

export default withStore(ChatInfo, mapStateToProps);
