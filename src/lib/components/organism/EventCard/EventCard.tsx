import { Button } from '@chakra-ui/button';
import { Badge, Box } from '@chakra-ui/layout';
import Image from 'next/image';
import Link from 'next/link';

import { EventCardProps } from 'lib/types/components';

import parseLongString from '@utils/parseLongString';

function EventCard({
  title = 'O Terno',
  description = 'Theatro Municipal de São Paulo- São Paulo',
  imgUrl = '/img/dgd.jpg',
  date = '12 MAI - 22H',
  id = '1',
}: EventCardProps) {
  return (
    <Box
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      minHeight="450px"
      overflow="hidden"
      className="shadow"
      d="flex"
      flexDirection="column"
    >
      <Image
        src={imgUrl}
        alt={title}
        width={1280}
        height={720}
        objectFit="cover"
        objectPosition="center"
        className="shadow"
      />

      <Box
        p="6"
        d="flex"
        flexDirection="column"
        height="100%"
        flex="1"
        justifyContent="space-between"
      >
        <Box>
          <Box d="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="primary-c">
              {date}
            </Badge>
          </Box>
          <Box
            mt="2"
            fontWeight="semibold"
            as="h4"
            fontSize="2xl"
            lineHeight="tight"
            isTruncated
          >
            {title}
          </Box>

          <Box as="p" mt="1">
            {parseLongString(description)}
          </Box>
        </Box>

        <Box d="flex" mt="4" alignSelf="center">
          <Link href={`/comprar/${id}`} passHref>
            <Button className="uppercase" size="md">
              COMPRAR
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default EventCard;
