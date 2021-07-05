import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
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

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const token = parseCookies()[ACCESS_TOKEN];

  const [events, setEvents] = useState<EventI[]>([]);
  const [nextEvents, setNextEvents] = useState<EventI[]>([]);

  useEffect(() => {
    if (token) {
      const fetchEvents = async () => {
        const nextEventsResponse = await EventsAPI.nextEvents(token);
        const eventsResponse = await EventsAPI.events(token);

        const nextEventsData: EventI[] = nextEventsResponse.data?.data;
        const eventsData: EventI[] = eventsResponse.data?.data;

        if (eventsResponse.status !== 200) {
          destroyCookie(null, ACCESS_TOKEN);
        }

        if (nextEventsResponse.status !== 200) {
          destroyCookie(null, ACCESS_TOKEN);
        }

        setEvents(eventsData);
        setNextEvents(nextEventsData);
      };
      fetchEvents();
    }
  }, [token]);

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
