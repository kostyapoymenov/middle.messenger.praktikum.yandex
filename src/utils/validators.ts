const validate = (value: string, pattern: RegExp, error: string): string | undefined => {
  if (pattern.test(value)) {
    return undefined;
  }

  return error;
};

export const validateName = (name: string) =>
  validate(
    name,
    /^[A-ZА-ЯЁ][a-zа-яёA-ZА-ЯЁ-]*$/u,
    'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)'
  );

export const validateLogin = (login: string) =>
  validate(
    login,
    /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/,
    'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)'
  );

export const validateEmail = (email: string) =>
  validate(
    email,
    /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]*[a-zA-Z]\.[a-zA-Z0-9_-]+$/,
    'латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы'
  );

export const validatePassword = (password: string) =>
  validate(
    password,
    /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'
  );

export const validatePhone = (phone: string) =>
  validate(
    phone,
    /^(?:\+?\d{10,15}|\+\d{9,14})$/,
    'от 10 до 15 символов, состоит из цифр, может начинается с плюса'
  );

export const validateMessage = (message: string) =>
  validate(message, /^[\s\S]+$/, 'не должно быть пустым.');
