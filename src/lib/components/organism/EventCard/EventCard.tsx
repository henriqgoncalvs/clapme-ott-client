import { Button } from '@chakra-ui/button';
import { Badge, Box } from '@chakra-ui/layout';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { EventCardProps } from 'lib/types/components';

import parseLongString from '@utils/parseLongString';

import 'dayjs/locale/pt-br';

function EventCard({ title, description, imgUrl, date, id }: EventCardProps) {
  console.log(imgUrl, id);
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
        src={
          imgUrl !== 'string'
            ? imgUrl ||
              'https://149361159.v2.pressablecdn.com/wp-content/uploads/2021/01/placeholder.png'
            : 'https://149361159.v2.pressablecdn.com/wp-content/uploads/2021/01/placeholder.png'
        }
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
            <Badge
              borderRadius="full"
              px="2"
              bg="primary-c.500"
              color="secondary-c"
            >
              {dayjs(date).locale('pt-br').format('DD MMM - HH:mm')}
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
          <Link href={`/evento/${id}`} passHref>
            <Button className="uppercase" size="md">
              Adicionar ao carrinho
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default EventCard;
