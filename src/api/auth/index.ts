import HTTPTransport from '../../core/HTTPTransport';
import { API_MAPPING } from '../../env';
import type { ILogInData, IRegistrationData } from './types';
import type { IUser } from '../../models/user';

const httpClient = new HTTPTransport(API_MAPPING.auth);

export const AUTH_API = {
  logIn: (data: ILogInData) => httpClient.post('signin', { data }),
  registration: (data: IRegistrationData) =>
    httpClient.post('signup', { data }),
  logout: () => httpClient.post('logout'),
  me: (): Promise<IUser> => httpClient.get('user'),
};
