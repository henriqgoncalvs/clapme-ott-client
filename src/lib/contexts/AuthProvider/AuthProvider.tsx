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
import { AuthProviderI } from 'lib/types/contexts/auth-provider';
import { User } from 'lib/types/user';

const AuthContext = createContext({} as AuthProviderI);

function AuthProvider({ children }: { children: ReactNode }) {
  const toast = useToast();

  const [user, setUser] = useState<User | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const router = useRouter();

  const updateUser = () => {
    const token = parseCookies()[ACCESS_TOKEN];

    if (token) {
      const fetchMe = async () => {
        try {
          const meResponse = await UserAPI.me();
          setUser(meResponse.data);
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
          toast({
            position: 'top',
            title: 'Erro no carregamento das informações do usuário.',
            description:
              'Estamos passando por uma manutenção, tente novamente mais tarde.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      };
      fetchMe();
    } else {
      setIsAuthenticated(false);
    }
  };

  const login = async (values: Login) => {
    try {
      const response = await AuthAPI.login(values);
      setCookie(null, ACCESS_TOKEN, response.data?.token);
      setIsAuthenticated(true);
      updateUser();
      router.push('/');
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
    setIsAuthenticated(false);
    setUser(null);
    toast({
      position: 'top',
      title: 'Deslogado com sucesso.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    router.push('/entrar');
  };

  useEffect(() => {
    updateUser();
  }, []);

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
