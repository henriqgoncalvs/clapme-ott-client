import { useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

import PageLoading from '@layout/PageLoading';
import ProfileLayout from '@layout/ProfileLayout';

function Perfil() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/');
    }
  }, [isAuthenticated]);

  if (!user) return <PageLoading />;

  return (
    <Container mt={20} py="16" px="8" maxW="7xl">
      <ProfileLayout />
    </Container>
  );
}

export default Perfil;
