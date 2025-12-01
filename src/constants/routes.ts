import type Block from '../core/block';
import ChangePasswordPage from '../pages/changePasswordPage';
import ChatsPage from '../pages/chatsPage';
import EditProfilePage from '../pages/editProfilePage';
import ErrorPage from '../pages/errorPage';
import LoginPage from '../pages/loginPage';
import ProfilePage from '../pages/profilePage';
import RegistrationPage from '../pages/registrationPage';

export interface IRoute {
  name: string;
  component: Block;
  props?: Record<string, unknown>;
}

export const ROUTES = {
  notFound: '/404',
  serverDown: '/500',
  registration: '/sign-up',
  logIn: '/',
  chats: '/messenger',
  profile: '/settings',
  editProfile: '/edit-profile',
  editPassword: '/edit-password',
};

export const ROUTES_MAPPING = [
  { pathname: ROUTES.editPassword, component: ChangePasswordPage },
  { pathname: ROUTES.chats, component: ChatsPage },
  { pathname: ROUTES.editProfile, component: EditProfilePage },
  {
    pathname: ROUTES.serverDown,
    component: ErrorPage,
    props: {
      code: '500',
      text: 'Что-то пошло не так! Уже фиксим',
    },
  },
  {
    pathname: ROUTES.notFound,
    component: ErrorPage,
    props: {
      code: '404',
      text: 'Страница не найдена',
    },
  },
  { pathname: ROUTES.logIn, component: LoginPage },
  { pathname: ROUTES.profile, component: ProfilePage },
  { pathname: ROUTES.registration, component: RegistrationPage },
];

export const UNATHORIZE_ROUTES = [ROUTES.logIn, ROUTES.registration];
