import { USER_API } from '../../api/user';
import type { IChangePassData } from '../../api/user/types';
import { ROUTES } from '../../constants/routes';
import { withTryCatch } from '../../core/errorHandler';
import type { IUser } from '../../models/user';

export const changePassword = async (data: IChangePassData) => {
  const [isChanged] = await withTryCatch(USER_API.changePassword(data));
  if (isChanged) {
    window.router.go(ROUTES.profile);
  }
};

export const editProfile = async (data: IUser) => {
  const [user] = await withTryCatch<IUser>(USER_API.editProfile(data));
  if (user) {
    window.store.setState({ user });
    window.router.go(ROUTES.profile);
  }
};

export const updateAvatar = async (file: File) => {
  const data = new FormData();
  data.append('avatar', file);
  const [user] = await withTryCatch<IUser>(USER_API.updateAvatar(data));
  if (user) {
    window.store.setState({ user });
  }
};
