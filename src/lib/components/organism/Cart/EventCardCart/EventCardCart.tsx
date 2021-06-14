import { Badge, Box, Stack } from '@chakra-ui/layout';
import dayjs from 'dayjs';

import { EventCardCartProps } from 'lib/types/components';

import parseLongString from '@utils/parseLongString';

import 'dayjs/locale/pt-br';

function EventCardCart({
  title = 'O Terno',
  description = 'Theatro Municipal de São Paulo- São Paulo',
  date = '12 MAI - 22H',
}: Omit<EventCardCartProps, 'id'>) {
  return (
    <Stack
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="shadow"
      direction="column"
    >
      <Box
        py="8"
        px="6"
        mx="10"
        d="flex"
        flexDirection="row"
        height="100%"
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
            wordBreak="break-word"
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
      </Box>
    </Stack>
  );
}

export default EventCardCart;
