import HTTPTransport from '../../core/HTTPTransport';
import type { IChat } from '../../models/chat';
import { API_MAPPING } from '../../env';
import type { IUserAdditionToChatData, IUserDeletionToChatData } from './types';
const httpClient = new HTTPTransport(API_MAPPING.chats);

export const CHATS_API = {
  getChats: () => httpClient.get<IChat[]>(''),
  getToken: (chatId: IChat['id']) =>
    httpClient.post<{ token: string }>(`/token/${chatId}`),
  getChatUsers: (chatId: IChat['id']) => httpClient.get(`/${chatId}/users`),
  createChat: (data: { title: IChat['title'] }): Promise<{ id: number }> =>
    httpClient.post('', { data }),
  addUsersToChat: (data: IUserAdditionToChatData): Promise<unknown> =>
    httpClient.put('users', { data }),
  deleteUsersFromChat: (data: IUserDeletionToChatData): Promise<unknown> =>
    httpClient.delete('users', { data }),
};
