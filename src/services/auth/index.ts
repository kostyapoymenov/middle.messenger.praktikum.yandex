import { AUTH_API } from '../../api/auth';
import type { ILogInData, IRegistrationData } from '../../api/auth/types';
import { ROUTES } from '../../constants/routes';
import { withTryCatch } from '../../core/errorHandler';
import type { IUser } from '../../models/user';

export const registration = async (data: IRegistrationData) => {
  const [isSignedUp] = await withTryCatch(AUTH_API.registration(data));
  if (isSignedUp) {
    await fetchMe();
    window.router.go(ROUTES.chats);
  }
};

export const logIn = async (data: ILogInData) => {
  const [isSigned] = await withTryCatch(AUTH_API.logIn(data));
  if (isSigned) {
    await fetchMe();
    window.router.go(ROUTES.chats);
  }
};

export const logout = async () => {
  const [isLogout] = await withTryCatch<IUser>(AUTH_API.logout());
  if (isLogout) {
    window.router.go(ROUTES.logIn);
  }
};

export const fetchMe = async () => {
  const [user] = await withTryCatch<IUser>(AUTH_API.me(), true);
  const { setState } = window.store;
  setState({ user });
  return user;
};
