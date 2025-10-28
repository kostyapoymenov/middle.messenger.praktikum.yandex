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

export const ROUTES = [
  { name: 'Редактирование пароля', component: new ChangePasswordPage() },
  { name: 'Чаты', component: new ChatsPage() },
  { name: 'Редактирование профиля', component: new EditProfilePage() },
  {
    name: '500',
    component: new ErrorPage({ code: '500', text: 'Что-то пошло не так! Уже фиксим' }),
  },
  {
    name: '404',
    component: new ErrorPage({ code: '404', text: 'Что-то пошло не так! Уже фиксим' }),
  },
  { name: 'Вход', component: new LoginPage() },
  { name: 'Профиль', component: new ProfilePage() },
  { name: 'Регистарция', component: new RegistrationPage() },
];
