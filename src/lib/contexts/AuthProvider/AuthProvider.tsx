import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { AuthAPI, UserAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN } from 'core/config';
import { Login } from 'lib/types/api/auth';
import { User } from 'lib/types/api/user';
import { AuthProviderI } from 'lib/types/contexts/auth-provider';

const AuthContext = createContext({} as AuthProviderI);

function AuthProvider({ children }: { children: ReactNode }) {
  const toast = useToast();

  const [user, setUser] = useState<User | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = parseCookies()[ACCESS_TOKEN];

    if (token) {
      const fetchMe = async () => {
        try {
          const meResponse = await UserAPI.me();
          setUser(meResponse.data);
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
        }
      };
      fetchMe();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (values: Login) => {
    try {
      const response = await AuthAPI.login(values);
      setCookie(null, ACCESS_TOKEN, response.data?.token, {
        maxAge: 60 * 60 * 1, // 1 Hour
      });
      setIsAuthenticated(true);
    } catch (err) {
      toast({
        position: 'top',
        title: 'Erro no login.',
        description: 'Confira as informações de email e senha.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return new Error(err);
    }
  };

  const logout = () => {
    destroyCookie(null, ACCESS_TOKEN);
    router.push('/entrar');
  };

  const values = {
    isAuthenticated,
    user,
    setUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
