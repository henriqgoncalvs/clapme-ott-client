import { useEffect, useState } from 'react';
import { Box, Center, Container, Flex, useToast } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { EventsAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN } from 'core/config';
import { EventI } from 'lib/types/api/events';
import { ProductI } from 'lib/types/api/product';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';
import ChatProvider from '@contexts/ChatProvider';

import PageLoading from '@layout/PageLoading';

import ChatFeed from '@organism/Chat/ChatFeed';

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

  return (
    <ChatProvider>
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
            <Flex
              alignItems="stretch"
              direction={{ base: 'column', lg: 'row' }}
              height="100%"
            >
              <Box flex="1">
                <Center w="100%" mx="auto" h="100%" pos="relative" zIndex="15">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    src={event.url_player}
                  ></iframe>
                </Center>
              </Box>
              <Box className="z-20" flex={{ base: '2', lg: '0.4' }}>
                <ChatFeed />
              </Box>
            </Flex>
            <img
              src={event.banner}
              className="absolute w-screen h-screen top-0 left-0 object-cover z-10 filter blur-sm"
            />
          </>
        )}
      </Container>
    </ChatProvider>
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
    redirect: {
      permanent: false,
      destination: '/',
    },
  };
};

export default Watch;
