import Block from '../../core/block';
import template from './template.hbs?raw';
import Link from '../../components/link';
import type { IFormFieldProps } from '../../components/formField/types';
import Form from '../../components/form';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from '../../utils/validators';
import { ROUTES } from '../../constants/routes';
import { registration } from '../../services/auth';
import type { IRegistrationData } from '../../api/auth/types';
import '../../styles/form-page.scss';

const SIGN_UP_FIELDS: Partial<IFormFieldProps>[] = [
  { label: 'Почта', name: 'email', type: 'email', validationFn: validateEmail },
  { label: 'Логин', name: 'login', validationFn: validateLogin },
  { label: 'Имя', name: 'first_name', validationFn: validateName },
  { label: 'Фамилия', name: 'second_name', validationFn: validateName },
  {
    label: 'Телефон',
    name: 'phone',
    type: 'phone',
    validationFn: validatePhone,
  },
  {
    label: 'Пароль',
    name: 'password',
    type: 'password',
    validationFn: validatePassword,
  },
  {
    label: 'Повторите пароль',
    name: 'repeat_password',
    type: 'password',
    validationFn: validatePassword,
  },
];

class RegistrationPage extends Block {
  constructor() {
    const form = new Form({
      fields: SIGN_UP_FIELDS,
      submitButton: { text: 'Регистрация' },
      events: {
        submit: (event) => {
          event.preventDefault();
          (form.children.fileds as Block[]).forEach((block) => {
            (block.children.inputField as Block).getElement()?.blur();
          });
          if (event.currentTarget) {
            const data = Object.fromEntries(
              new FormData(event.currentTarget as HTMLFormElement).entries()
            );
            registration(data as unknown as IRegistrationData);
          }
        },
      },
    });
    const signInLink = new Link({
      text: 'Вход',
      events: { click: (): void => window.router.go(ROUTES.logIn) },
    });
    super('main', {
      className: 'forms-page',
      form,
      signInLink,
    });
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default RegistrationPage;
