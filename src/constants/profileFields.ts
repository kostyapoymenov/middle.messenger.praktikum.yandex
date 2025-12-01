export const PROFILE_FILEDS = {
  email: 'email',
  login: 'login',
  firstName: 'first_name',
  secondName: 'second_name',
  displayName: 'display_name',
  phone: 'phone',
} as const;

export const PROFILE_FIELDS_MAPPING: Record<
  (typeof PROFILE_FILEDS)[keyof typeof PROFILE_FILEDS],
  string
> = {
  [PROFILE_FILEDS.email]: 'Почта',
  [PROFILE_FILEDS.login]: 'Логин',
  [PROFILE_FILEDS.firstName]: 'Имя',
  [PROFILE_FILEDS.secondName]: 'Фамилия',
  [PROFILE_FILEDS.displayName]: 'Имя в чате',
  [PROFILE_FILEDS.phone]: 'Телефон',
};
