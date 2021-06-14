import { useEffect } from 'react';
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
import PageLoading from '@layout/PageLoading';

type Props = {
  nextEvents: EventI[];
  events: EventI[];
};

export default function Home({ events }: Props) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false && !styleguide.public_home) {
      router.push('/entrar');
    }
  }, [isAuthenticated]);

  if (!user) return <PageLoading />;

  return (
    <>
      <Header />
      <NextEvents
        nextEvents={events.filter((event) =>
          dayjs().isBefore(dayjs(event.premiere_date)),
        )}
      />
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
    // const nextEventsresponse = await EventsAPI.nextEvents(token);
    const eventsresponse = await EventsAPI.events(token);

    // const nextEventsData: EventI[] = nextEventsresponse.data.data;
    const eventsData: EventI[] = eventsresponse.data.data;

    return {
      props: {
        // nextEvents: nextEventsData,
        events: eventsData,
      },
    };
  }

  return {
    props: {},
  };
};
