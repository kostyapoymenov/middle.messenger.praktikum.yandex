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
}

export const ROUTES = {
  notFound: '/404',
  serverDown: '/500',
  registration: '/registration',
  logIn: '/',
  chats: '/messenger',
  profile: '/profile',
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
  },
  {
    pathname: ROUTES.notFound,
    component: ErrorPage,
  },
  { pathname: ROUTES.logIn, component: LoginPage },
  { pathname: ROUTES.profile, component: ProfilePage },
  { pathname: ROUTES.registration, component: RegistrationPage },
];

export const UNATHORIZE_ROUTES = [ROUTES.logIn, ROUTES.registration];
