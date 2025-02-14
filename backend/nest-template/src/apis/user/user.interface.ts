import { UserService } from './user.service';

export type UserInfo = Awaited<ReturnType<UserService['getUser']>>;
