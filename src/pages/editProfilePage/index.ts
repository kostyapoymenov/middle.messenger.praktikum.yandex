import Block from '../../core/block';
import template from './template.hbs?raw';
import Avatar from '../../components/avatar';
import type { IFormFieldProps } from '../../components/formField/types';
import Form from '../../components/form';
import { validateEmail, validateLogin, validateName, validatePhone } from '../../utils/validators';
import '../../styles/form-page.scss';

const EDIT_PROFILE_FIELDS: Partial<IFormFieldProps>[] = [
  { label: 'Почта', name: 'email', type: 'email', validationFn: validateEmail },
  { label: 'Логин', name: 'login', validationFn: validateLogin },
  { label: 'Имя', name: 'first_name', validationFn: validateName },
  { label: 'Фамилия', name: 'second_name', validationFn: validateName },
  { label: 'Имя в чате', name: 'display_name', validationFn: validateName },
  { label: 'Телефон', name: 'phone', type: 'phone', validationFn: validatePhone },
];

class EditProfilePage extends Block {
  constructor() {
    const avatar = new Avatar({ letter: 'K', editable: true });
    const form = new Form({
      fields: EDIT_PROFILE_FIELDS,
      submitButton: { text: 'Сохранить' },
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

    super('main', {
      className: 'forms-page',
      avatar,
      form,
    });
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default EditProfilePage;
