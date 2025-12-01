import Block from '../../core/block';
import template from './template.hbs?raw';
import type { IFormFieldProps } from '../../components/formField/types';
import { validatePassword } from '../../utils/validators';
import Form from '../../components/form';
import GoToChats from '../../components/goToChats';
import { changePassword } from '../../services/user';
import type { IChangePassData } from '../../api/user/types';
import '../../styles/form-page.scss';

const EDIT_PASSWORD_FIELDS: Partial<IFormFieldProps>[] = [
  {
    label: 'Старый пароль',
    name: 'oldPassword',
    type: 'password',
    validationFn: validatePassword,
  },
  {
    label: 'Новый пароль',
    name: 'newPassword',
    type: 'password',
    validationFn: validatePassword,
  },
  {
    label: 'Повторите новый пароль',
    name: 'newPasswordRepeat',
    type: 'password',
    validationFn: validatePassword,
  },
];

class ChangePasswordPage extends Block {
  constructor() {
    const goToChats = new GoToChats();
    const form = new Form({
      fields: EDIT_PASSWORD_FIELDS,
      submitButton: { text: 'Сохранить' },
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
            changePassword(data as unknown as IChangePassData);
          }
        },
      },
    });

    super('main', {
      className: 'forms-page',
      form,
      goToChats,
    });
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default ChangePasswordPage;
