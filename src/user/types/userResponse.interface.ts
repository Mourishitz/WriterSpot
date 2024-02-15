import { UserType } from '@app/user/user.type';

export interface UserResponseInterface {
  user: UserType & { token: string };
}
