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

import { AuthAPI, ProductsAPI, UserAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN } from 'core/config';
import { Login } from 'lib/types/api/auth';
import { BoughtProducts } from 'lib/types/api/product';
import { AuthProviderI } from 'lib/types/contexts/auth-provider';
import { User } from 'lib/types/user';

const AuthContext = createContext({} as AuthProviderI);

function AuthProvider({ children }: { children: ReactNode }) {
  const toast = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [boughtProducts, setBoughtProducts] = useState<BoughtProducts[] | null>(
    null,
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const router = useRouter();

  const updateUser = () => {
    const token = parseCookies()[ACCESS_TOKEN];

    if (token) {
      const fetchBoughtProducts = async () => {
        const boughtProductsResponse = await ProductsAPI.boughtProducts();

        setBoughtProducts(boughtProductsResponse.data);

        if (boughtProductsResponse.status === 403) {
          toast({
            position: 'top',
            title: 'Ocorreu um erro na verificação dos seus itens comprados.',
            description: 'Entre em contato com o suporte.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });

          return logout();
        }
      };

      const fetchMe = async () => {
        try {
          const meResponse = await UserAPI.me();
          if (meResponse.status === 403) {
            if (
              meResponse.data.message === 'Your email address is not verified.'
            ) {
              toast({
                position: 'top',
                title: 'Email não verificado.',
                description:
                  'Consulte sua caixa de entrada e siga as instruções para verificar seu email.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
              return router.push('/verificar-email');
            }

            return logout();
          }

          setUser(meResponse.data);
          setIsAuthenticated(true);
          fetchBoughtProducts();
          router.push('/');
        } catch (err) {
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

  const logout = (
    type?: 'info' | 'warning' | 'success' | 'error',
    title?: string,
  ) => {
    destroyCookie(null, ACCESS_TOKEN);
    setIsAuthenticated(false);
    setUser(null);
    toast({
      position: 'top',
      title: title || 'Deslogado com sucesso.',
      status: type || 'success',
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
    boughtProducts,
    setUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
