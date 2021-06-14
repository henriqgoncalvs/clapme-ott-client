import { Login } from 'lib/types/api/auth';
import { User } from 'lib/types/user';

import { BoughtProducts } from '../api/product';

export type AuthProviderI = {
  isAuthenticated: boolean | null;
  user: User | null;
  boughtProducts: BoughtProducts[];
  login?: (values: Login) => Promise<Error | void>;
  logout?: () => void;
};
