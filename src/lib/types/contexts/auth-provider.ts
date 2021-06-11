import { Login } from 'lib/types/api/auth';
import { User } from 'lib/types/user';

export type AuthProviderI = {
  isAuthenticated: boolean | null;
  user: User | null;
  login?: (values: Login) => Promise<Error | void>;
  logout?: () => void;
};
