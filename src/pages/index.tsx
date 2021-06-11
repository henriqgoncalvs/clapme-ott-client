import { useEffect } from 'react';
import { Center, Container, Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { EventsAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN } from 'core/config';
import { EventI } from 'lib/types/api/events';

import styleguide from '@root/styleguide.json';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

import Header from '@layout/Home/Header';
import NextEvents from '@layout/Home/NextEvents';

type Props = {
  nextEventsData: EventI[];
};

export default function Home({ nextEventsData }: Props) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false && !styleguide.public_home) {
      router.push('/entrar');
    }
  }, [isAuthenticated]);

  if (!user) {
    return (
      <Container w="100vw" h="100vh">
        <Center h="100%" w="100%">
          <Flex direction="column" align="center">
            <Spinner thickness="4px" color="primary-c.500" />
            <h1>Carregando...</h1>
          </Flex>
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <NextEvents nextEvents={nextEventsData} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const token = parseCookies()[ACCESS_TOKEN];

  if (token) {
    const response = await EventsAPI.nextEvents();

    const nextEventsData: EventI = response.data;

    return {
      props: {
        events: nextEventsData,
      },
    };
  }

  return {
    props: {},
  };
};
