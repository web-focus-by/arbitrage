import { IUser } from '../../../../services/auth.ts';

export const getDefaultFormValue = (user: IUser | null) => {
  return {
    email: user?.email ?? '',
    name: user?.name ?? '',
    telegram: user?.telegram ?? '',
    newPassword: '',
    confirmPassword: '',
  };
};
