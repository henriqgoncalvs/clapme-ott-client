import { useEffect } from 'react';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { ProductsAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN } from 'core/config';
import { ProductI } from 'lib/types/api/product';

import styleguide from '@root/styleguide.json';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

import AllEvents from '@layout/Home/AllEvents';
import Header from '@layout/Home/Header';
import NextEvents from '@layout/Home/NextEvents';
import PageLoading from '@layout/PageLoading';

type Props = {
  products: ProductI[];
};

export default function Home({ products }: Props) {
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
        nextProducts={products.filter((product) =>
          dayjs().isBefore(dayjs(product.events[0].premiere_date)),
        )}
      />
      <AllEvents
        products={products.filter((product) =>
          dayjs().isAfter(dayjs(product.events[0].premiere_date)),
        )}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = parseCookies(ctx)[ACCESS_TOKEN];

  if (token) {
    // const nextEventsresponse = await EventsAPI.nextEvents(token);
    // const eventsresponse = await EventsAPI.events(token);
    const productsResponse = await ProductsAPI.get(token);

    // const nextEventsData: EventI[] = nextEventsresponse.data.data;
    const productsData: ProductI[] = productsResponse.data?.data;

    if (!productsData) {
      return {
        props: {},
      };
    }

    return {
      props: {
        // nextEvents: nextEventsData,
        products: productsData,
      },
    };
  }

  return {
    props: {},
  };
};
