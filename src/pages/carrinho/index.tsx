import { useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import styleguide from '@root/styleguide.json';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

import CartLayout from '@layout/CartLayout';
import PageLoading from '@layout/PageLoading';

function Cart() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false && !styleguide.public_home) {
      router.push('/');
    }
  }, [isAuthenticated]);

  if (!user) return <PageLoading />;

  return (
    <>
      <Container mt={20} py="16" px="8" maxW="7xl">
        <CartLayout />
      </Container>
    </>
  );
}

export default Cart;
