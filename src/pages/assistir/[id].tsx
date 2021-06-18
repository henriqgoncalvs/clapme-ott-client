import { useEffect, useState } from 'react';
import { Center, Container, useToast } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { EventsAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN } from 'core/config';
import { EventI } from 'lib/types/api/events';
import { ProductI } from 'lib/types/api/product';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

import PageLoading from '@layout/PageLoading';

type Props = {
  event: EventI & {
    url_player: string;
    banner: string;
    products: ProductI[];
  };
};

function Watch({ event }: Props) {
  const { isAuthenticated, user, boughtProducts } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [eventAllowed, setEventAllowed] = useState(false);

  console.log(event);

  const { id } = router.query;

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (boughtProducts) {
      if (
        boughtProducts?.filter(
          (bp) =>
            bp.product.filter(
              (p) =>
                p.events.filter((e) => {
                  return e.id == id;
                }).length,
            ).length,
        ).length !== 0
      ) {
        setEventAllowed(true);
      } else if (!event.products?.length) {
        setEventAllowed(true);
      } else {
        toast({
          position: 'top',
          title: 'Esse evento ainda não começou ou você não tem permissão.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        router.push('/');
      }
    }
  }, [boughtProducts]);

  if (!user) return <PageLoading />;

  if (!event.is_active) {
    return router.push('/');
  }

  return (
    <Container
      py="16"
      px="8"
      mt={10}
      h="100vh"
      maxW="100vw"
      pos="relative"
      overflowX="hidden"
      _before={{
        content: "''",
        bg: 'solid-c',
        pos: 'absolute',
        top: 0,
        left: 0,
        w: '100%',
        h: '100%',
        zIndex: 13,
        opacity: 0.7,
      }}
    >
      {eventAllowed && (
        <>
          <Center maxW="2xl" mx="auto" h="100%" pos="relative" zIndex="15">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              src={event.url_player}
            ></iframe>
          </Center>
          <img
            src={event.banner}
            className="absolute w-screen h-screen top-0 left-0 object-cover z-10 filter blur-sm"
          />
        </>
      )}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = parseCookies(ctx)[ACCESS_TOKEN];
  const id: number | string | string[] | undefined = ctx.params?.id;

  if (token) {
    const watchEventResponse = await EventsAPI.watch(id, token);

    if (watchEventResponse.status === 403) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }

    const watchEventData: EventI = watchEventResponse.data?.data || [];

    const eventResponse = await EventsAPI.showEvent(id, token);

    if (eventResponse.status === 403) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }

    const eventData: EventI = eventResponse.data?.data || [];

    const event = {
      ...watchEventData,
      banner: eventData.banner,
      products: eventData.products,
    };

    if (eventData.products) {
      return {
        props: {
          event: event,
        },
      };
    }

    return {
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default Watch;
