import { useEffect, useState } from 'react';
import { Center, Container, useToast } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { EventsAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN } from 'core/config';
import { EventI } from 'lib/types/api/events';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

import PageLoading from '@layout/PageLoading';

type Props = {
  event: EventI & {
    url_player: string;
  };
};

function Watch({ event }: Props) {
  const { isAuthenticated, user, boughtProducts } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [eventAllowed, setEventAllowed] = useState(false);

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
        ).length === 0
      ) {
        toast({
          position: 'top',
          title: 'Esse evento ainda não começou ou você não tem permissão.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        router.push('/');
      } else {
        setEventAllowed(true);
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
            src={event.og_url}
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
    const eventResponse = await EventsAPI.watch(id, token);

    const eventData: EventI = eventResponse.data?.data || [];

    return {
      props: {
        event: eventData,
      },
    };
  }

  return {
    props: {},
  };
};

export default Watch;
