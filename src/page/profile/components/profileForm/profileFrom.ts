import { IUser } from '../../../../services/auth.ts';

export const getDefaultFormValue = (user: IUser | null) => {
  return {
    email: user?.email ?? '',
    username: user?.name ?? '',
    telegramName: user?.telegram ?? '',
    newPassword: '',
    confirmPassword: '',
  };
};
