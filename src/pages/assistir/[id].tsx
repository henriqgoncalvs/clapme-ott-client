import { useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Center, Container } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import { EventsAPI } from 'core/api/fetchers';
import { ACCESS_TOKEN } from 'core/config';
import { EventI } from 'lib/types/api/events';

import styleguide from '@root/styleguide.json';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

import PageLoading from '@layout/PageLoading';

type Props = {
  event: EventI & {
    url_player: string;
  };
};

function Watch({ event }: Props) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false && !styleguide.public_home) {
      router.push('/');
    }
  }, [isAuthenticated]);

  if (!user) return <PageLoading />;

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
      <Center maxW="2xl" mx="auto" h="100%" pos="relative" zIndex="15">
        <ReactPlayer url="https://www.youtube.com/watch?v=w5v5SyI4THE" />
      </Center>

      <img
        src={event.og_url}
        className="absolute w-screen h-screen top-0 left-0 object-cover z-10 filter blur-sm"
      />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = parseCookies(ctx)[ACCESS_TOKEN];
  const id: string | string[] | undefined = ctx.params?.id;

  if (token) {
    const eventResponse = await EventsAPI.watch(id, token);

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

export default Watch;
