import type { IAppState } from './types';

export const STORE_EVENTS = { updated: 'updated' };

export const STORE_DEFAULT_STATE: Partial<IAppState> = {
  user: undefined,
  chats: [],
  messages: [],
  selectedChat: undefined,
  selectedChatUsers: [],
};
