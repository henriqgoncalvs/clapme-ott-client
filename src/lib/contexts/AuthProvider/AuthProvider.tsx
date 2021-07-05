/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useToast } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { AuthAPI, ProductsAPI, UserAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN, FIREBASE_USERS_ONLINE_COLLECTION } from 'core/config';
import firebase, { db } from 'core/firebase';
import { Login } from 'lib/types/api/auth';
import { BoughtProducts } from 'lib/types/api/product';
import { AuthProviderI } from 'lib/types/contexts/auth-provider';
import { User } from 'lib/types/user';

import 'firebase/firestore';

const AuthContext = createContext({} as AuthProviderI);

function AuthProvider({ children }: { children: ReactNode }) {
  const toast = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [boughtProducts, setBoughtProducts] = useState<BoughtProducts[] | null>(
    null,
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const router = useRouter();

  const userStatusDatabaseRef = firebase.database().ref('/status/' + user?.id);

  const userStatusFirestoreRef = firebase
    .firestore()
    .doc('/status/' + user?.id);

  useEffect(() => {
    if (user?.id) {
      if (user?.is_company_admin === false) {
        firebase
          .database()
          .ref('.info/connected')
          .on('value', function (snapshot) {
            if (snapshot.val() == false) {
              userStatusFirestoreRef.set({
                uid: user?.id,
                displayName: user?.name,
                company: user?.user_company,
                state: 'offline',
                last_changed: firebase.firestore.FieldValue.serverTimestamp(),
              });
              return;
            }

            userStatusDatabaseRef
              .onDisconnect()
              .set({
                uid: user?.id,
                displayName: user?.name,
                company: user?.user_company,
                state: 'offline',
                last_changed: firebase.database.ServerValue.TIMESTAMP,
              })
              .then(function () {
                userStatusDatabaseRef.set({
                  uid: user?.id,
                  displayName: user?.name,
                  company: user?.user_company,
                  state: 'online',
                  last_changed: firebase.database.ServerValue.TIMESTAMP,
                });

                userStatusFirestoreRef.set({
                  uid: user?.id,
                  displayName: user?.name,
                  company: user?.user_company,
                  state: 'online',
                  last_changed: firebase.firestore.FieldValue.serverTimestamp(),
                });
              });
          });
      }

      db.collection(FIREBASE_USERS_ONLINE_COLLECTION)
        .doc(user?.id.toString())
        .onSnapshot((querySnapShot: any) => {
          const data = querySnapShot.data();

          if (
            data !== undefined &&
            data.session_token !==
              parseCookies(null, ACCESS_TOKEN)[ACCESS_TOKEN]
          ) {
            logout();
            // router.reload();
            return toast({
              position: 'top',
              title: 'Alguém acessou sua conta.',
              description:
                'Por favor não compartilhe sua conta, cada conta deve pertencer a um único usuário.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        });
    }
  }, [user]);

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

          db.collection(FIREBASE_USERS_ONLINE_COLLECTION)
            .doc(meResponse.data?.id.toString())
            .get()
            .then((doc) => {
              if (doc.exists) {
                db.collection(FIREBASE_USERS_ONLINE_COLLECTION)
                  .doc(meResponse.data?.id.toString())
                  .update({
                    session_token: parseCookies(null, ACCESS_TOKEN)[
                      ACCESS_TOKEN
                    ],
                  })
                  .then(() => {
                    setUser(meResponse.data);
                    setIsAuthenticated(true);
                    fetchBoughtProducts();
                    router.push('/');
                  });
              } else {
                db.collection(FIREBASE_USERS_ONLINE_COLLECTION)
                  .doc(meResponse.data?.id.toString())
                  .set({
                    createdAt: dayjs().locale('pt-br').toISOString(),
                    uid: meResponse.data?.id,
                    displayName: meResponse.data?.name,
                    company: meResponse.data?.user_company,
                    session_token: parseCookies(null, ACCESS_TOKEN)[
                      ACCESS_TOKEN
                    ],
                  })
                  .then(() => {
                    setUser(meResponse.data);
                    setIsAuthenticated(true);
                    fetchBoughtProducts();
                    router.push('/');
                  });
              }
            });
        } catch (err) {
          console.log(err);
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

    userStatusDatabaseRef.set({
      uid: user?.id,
      displayName: user?.name,
      company: user?.user_company,
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
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
