import { useEffect } from 'react';
import { Center, Container, Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { EventsAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN } from 'core/config';
import { EventI } from 'lib/types/api/events';

import styleguide from '@root/styleguide.json';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

import AllEvents from '@layout/Home/AllEvents';
import Header from '@layout/Home/Header';
import NextEvents from '@layout/Home/NextEvents';

type Props = {
  nextEvents: EventI[];
  events: EventI[];
};

export default function Home({ nextEvents, events }: Props) {
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
      <NextEvents nextEvents={nextEvents} />
      <AllEvents
        events={events.filter((event) =>
          dayjs().isAfter(dayjs(event.premiere_date)),
        )}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = parseCookies(ctx)[ACCESS_TOKEN];

  if (token) {
    const nextEventsresponse = await EventsAPI.nextEvents(token);
    const eventsresponse = await EventsAPI.events(token);

    const nextEventsData: EventI[] = nextEventsresponse.data.data;
    const eventsData: EventI[] = eventsresponse.data.data;

    return {
      props: {
        nextEvents: nextEventsData,
        events: eventsData,
      },
    };
  }

  return {
    props: {},
  };
};
