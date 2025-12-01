import HTTPTransport from '../../core/HTTPTransport';
import { API_MAPPING } from '../../env';
import type { IUser } from '../../models/user';
import type { IChangePassData } from './types';

const httpClient = new HTTPTransport(API_MAPPING.user);

export const USER_API = {
  changePassword: (data: IChangePassData): Promise<unknown> =>
    httpClient.put('password', { data }),
  editProfile: (data: IUser): Promise<IUser> =>
    httpClient.put('profile', { data }),
  searchUsers: (login: string): Promise<IUser[]> =>
    httpClient.post('search', { data: { login } }),
  updateAvatar: (form: FormData): Promise<unknown> =>
    httpClient.put('profile/avatar', { data: form }),
};
