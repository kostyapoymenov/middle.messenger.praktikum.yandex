import type { IMessage } from '../models/message';
import type { IUser } from '../models/user';

export const userName = (
  user: IUser,
  chatUsers: IUser[],
  message: IMessage
): string => {
  if (message.user_id === user.id) {
    return 'Вы';
  }
  const owner = chatUsers.find((user) => message.user_id === user.id);
  return owner ? owner.login : 'Неизвестный отправитель';
};
