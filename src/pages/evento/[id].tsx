import { useEffect } from 'react';
import { Box, Center, Container, Flex, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { EventsAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN } from 'core/config';
import { EventI } from 'lib/types/api/events';

import styleguide from '@root/styleguide.json';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

import PageLoading from '@layout/PageLoading';

import Countdown from '@organism/Countdown';

type Props = {
  event: EventI;
};

function Event({ event }: Props) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/');
    }
  }, [isAuthenticated]);

  if (!user) return <PageLoading />;

  return (
    <>
      <Head>
        <title>Ao vivo - {event.title}</title>
        <meta property="og:title" content={`Ao vivo - ${event.og_title}`} />
        <meta property="og:description" content={event.og_description} />
        <meta property="og:url" content={event.og_url} />
        <meta property="og:image" content={event.banner} />
        <meta property="og:site_name" content={styleguide.type.brand} />
      </Head>
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
        <Center maxW="2xl" mx="auto" h="100%" pos="relative" zIndex="15">
          <Flex h="70vh" w="100%" direction={{ base: 'column', md: 'row' }}>
            <Box
              bg="black"
              borderTopLeftRadius="3xl"
              borderBottomLeftRadius={{ base: '0', md: '3xl' }}
              borderTopRightRadius={{ base: '3xl', md: '0' }}
              flex="1"
              p={8}
              h="100%"
              bgImg={event.banner}
              bgPos="center"
              bgSize="cover"
            />
            <Box
              bg="solid-c"
              flex="1"
              h="100%"
              d="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              borderTopRightRadius={{ base: '0', md: '3xl' }}
              borderBottomLeftRadius={{ base: '3xl', md: '0' }}
              borderBottomRightRadius="3xl"
              px={6}
              py={16}
            >
              <Stack
                color="solid-text-c"
                align="center"
                justifyContent="space-between"
                height={{ base: '100%', md: '80%' }}
              >
                <Flex align="center" direction="column">
                  <h1 className="mb-5">{event.title}</h1>
                  <Text textAlign="center">{event.description}</Text>
                </Flex>

                {event?.premiere_date && (
                  <Countdown
                    endDate={dayjs(event?.premiere_date)
                      .subtract(30, 'minutes')
                      .valueOf()}
                    id={event?.id}
                  />
                )}
              </Stack>
            </Box>
          </Flex>
        </Center>

        <img
          src={event.banner}
          className="absolute w-screen h-screen top-0 left-0 object-cover z-10 filter blur-sm"
        />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = parseCookies(ctx)[ACCESS_TOKEN];
  const id: number | string | string[] | undefined = ctx.params?.id;

  if (token) {
    const eventResponse = await EventsAPI.showEvent(id, token);

    const eventData: EventI = eventResponse.data.data;

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

export default Event;
