import Block from '../../core/block';
import template from './template.hbs?raw';
import Link from '../../components/link';
import Form from '../../components/form';
import { validateLogin, validatePassword } from '../../utils/validators';
import type { IFormFieldProps } from '../../components/formField/types';
import '../../styles/form-page.scss';

const SIGN_IN_FIELDS: Partial<IFormFieldProps>[] = [
  { label: 'Логин', name: 'login', validationFn: validateLogin },
  { label: 'Пароль', name: 'password', type: 'password', validationFn: validatePassword },
];

class LoginPage extends Block {
  constructor() {
    const form = new Form({
      fields: SIGN_IN_FIELDS,
      submitButton: { text: 'Войти' },
      events: {
        submit: (event) => {
          event.preventDefault();
          (form.children.fileds as Block[]).forEach((block) => {
            (block.children.inputField as Block).getElement()?.blur();
          });
          if (event.currentTarget) {
            console.log(
              Object.fromEntries(new FormData(event.currentTarget as HTMLFormElement).entries())
            );
          }
        },
      },
    });
    const registrationLink = new Link({
      text: 'Регистрация',
      events: { click: (event): void => event.preventDefault() },
    });
    super('main', {
      className: 'forms-page',
      form,
      registrationLink,
    });
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default LoginPage;
