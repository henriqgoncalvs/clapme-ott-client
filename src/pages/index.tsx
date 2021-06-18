import { useEffect } from 'react';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';

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
  events: EventI[];
  nextEvents: EventI[];
};

export default function Home({ events, nextEvents }: Props) {
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
        nextEvents={nextEvents.filter((event) =>
          dayjs().isBefore(dayjs(event.premiere_date)),
        )}
      />
      <AllEvents
        eventsToday={events.filter((event) =>
          dayjs().isSame(dayjs(event.premiere_date), 'day'),
        )}
        events={events.filter((event) =>
          dayjs().subtract(1, 'day').isAfter(dayjs(event.premiere_date)),
        )}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = parseCookies(ctx)[ACCESS_TOKEN];

  if (token) {
    const nextEventsResponse = await EventsAPI.nextEvents(token);
    const eventsResponse = await EventsAPI.events(token);

    const nextEventsData: EventI[] = nextEventsResponse.data?.data;
    const eventsData: EventI[] = eventsResponse.data?.data;

    if (nextEventsResponse.status !== 200 || eventsResponse.status !== 200) {
      destroyCookie(ctx, ACCESS_TOKEN);
    }

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
