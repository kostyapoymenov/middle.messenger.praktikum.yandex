import Block from '../../core/block';
import template from './template.hbs?raw';
import type { IFormFieldProps } from '../../components/formField/types';
import Form from '../../components/form';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
} from '../../utils/validators';
import GoToChats from '../../components/goToChats';
import type { IAppState } from '../../core/store/types';
import withStore from '../../core/store/utils';
import { editProfile } from '../../services/user';
import type { IUser } from '../../models/user';
import '../../styles/form-page.scss';

const EDIT_PROFILE_FIELDS: Partial<IFormFieldProps>[] = [
  { label: 'Почта', name: 'email', type: 'email', validationFn: validateEmail },
  { label: 'Логин', name: 'login', validationFn: validateLogin },
  { label: 'Имя', name: 'first_name', validationFn: validateName },
  { label: 'Фамилия', name: 'second_name', validationFn: validateName },
  { label: 'Имя в чате', name: 'display_name', validationFn: validateName },
  {
    label: 'Телефон',
    name: 'phone',
    type: 'phone',
    validationFn: validatePhone,
  },
];

class EditProfilePage extends Block {
  constructor() {
    const goToChats = new GoToChats();

    super('main', {
      className: 'forms-page',
      goToChats,
    });
  }

  render(): DocumentFragment {
    const { user } = this.meta.props as { user: IUser };

    this.children['form'] = new Form({
      fields: EDIT_PROFILE_FIELDS.map((item) => {
        if (user) {
          const name: keyof IUser = item.name as keyof IUser;
          const value = user[name];
          return { ...item, value };
        }
        return item;
      }),
      submitButton: { text: 'Сохранить' },
      events: {
        submit: (event) => {
          event.preventDefault();
          if (event.currentTarget) {
            const data = Object.fromEntries(
              new FormData(event.currentTarget as HTMLFormElement).entries()
            );
            editProfile(data as unknown as IUser);
          }
        },
      },
    });

    return this.compile(template, this.meta.props);
  }
}

const mapStateToProps = ({ user }: Partial<IAppState>) => ({ user });

export default withStore(EditProfilePage, mapStateToProps);
