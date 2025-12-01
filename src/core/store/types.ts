import type { IChat } from '../../models/chat';
import type { IMessage } from '../../models/message';
import type { IUser } from '../../models/user';

export type TListener<T> = (state: T) => void;

export interface IAppState {
  user: IUser;
  chats: IChat[];
  messages: IMessage[];
  selectedChat: IChat;
  selectedChatUsers: IUser[];
}
