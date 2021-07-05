import RCountdown from 'react-countdown';
import { Button } from '@chakra-ui/button';
import { Center, Flex, Text, Wrap, WrapItem } from '@chakra-ui/layout';
import dayjs from 'dayjs';
import Link from 'next/link';

type Props = {
  endDate: number;
  id: string | number;
};

function Countdown({ endDate, id }: Props) {
  return (
    <RCountdown
      date={endDate}
      renderer={({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return (
            <Flex align="center" direction="column">
              <Text mb={8} textAlign="center">
                {dayjs().isAfter(dayjs(endDate).add(4, 'hours'))
                  ? 'Veja o que aconteceu em nosso evento'
                  : 'Estamos ao vivo'}
              </Text>
              <Link href={`/assistir/${id}`} passHref>
                <Button
                  textTransform="uppercase"
                  size="lg"
                  maxW="300px"
                  w="100%"
                  className="animate-pulse"
                >
                  Assistir
                </Button>
              </Link>
            </Flex>
          );
        } else {
          return (
            <Flex align="center" direction="column">
              <Text mb={8} textAlign="center">
                O show começará em:
              </Text>
              <Wrap>
                <WrapItem>
                  <Flex alignItems="center" direction="column">
                    <Center
                      className="bg-text-solid-text-c bg-opacity-60 text-solid-c rounded-xl p-1"
                      w="40px"
                      h="40px"
                      bg="primary-c.200"
                    >
                      <Text fontSize="xl">{days < 10 ? `0${days}` : days}</Text>
                    </Center>
                    <Text mt={2} textAlign="center" fontSize="x-small">
                      Dias
                    </Text>
                  </Flex>
                </WrapItem>
                <WrapItem>
                  <Flex alignItems="center" direction="column">
                    <Center color="text-solid-c" w="10px" h="40px">
                      <Text fontSize="xl">:</Text>
                    </Center>
                  </Flex>
                </WrapItem>
                <WrapItem>
                  <Flex alignItems="center" direction="column">
                    <Center
                      className="bg-text-solid-text-c bg-opacity-60 text-solid-c rounded-xl p-1"
                      w="40px"
                      h="40px"
                      bg="primary-c.200"
                    >
                      <Text fontSize="xl">
                        {hours < 10 ? `0${hours}` : hours}
                      </Text>
                    </Center>
                    <Text mt={2} textAlign="center" fontSize="x-small">
                      Horas
                    </Text>
                  </Flex>
                </WrapItem>
                <WrapItem>
                  <Flex alignItems="center" direction="column">
                    <Center color="text-solid-c" w="10px" h="40px">
                      <Text fontSize="xl">:</Text>
                    </Center>
                  </Flex>
                </WrapItem>
                <WrapItem>
                  <Flex alignItems="center" direction="column">
                    <Center
                      className="bg-text-solid-text-c bg-opacity-60 text-solid-c rounded-xl p-1"
                      w="40px"
                      h="40px"
                      bg="primary-c.200"
                    >
                      <Text fontSize="xl">
                        {minutes < 10 ? `0${minutes}` : minutes}
                      </Text>
                    </Center>
                    <Text mt={2} textAlign="center" fontSize="x-small">
                      Minutos
                    </Text>
                  </Flex>
                </WrapItem>
                <WrapItem>
                  <Flex alignItems="center" direction="column">
                    <Center color="text-solid-c" w="10px" h="40px">
                      <Text fontSize="xl">:</Text>
                    </Center>
                  </Flex>
                </WrapItem>
                <WrapItem>
                  <Flex alignItems="center" direction="column">
                    <Center
                      className="bg-text-solid-text-c bg-opacity-60 text-solid-c rounded-xl p-1"
                      w="40px"
                      h="40px"
                      bg="primary-c.200"
                    >
                      <Text fontSize="xl">
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </Text>
                    </Center>
                    <Text mt={2} textAlign="center" fontSize="x-small">
                      Segundos
                    </Text>
                  </Flex>
                </WrapItem>
              </Wrap>
            </Flex>
          );
        }
      }}
    />
  );
}

export default Countdown;
