import { Badge, Box, Stack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

import { ProductCardCartProps } from 'lib/types/components';

import parseLongString from '@utils/parseLongString';

import 'dayjs/locale/pt-br';

function ProductCardCart({
  title = 'O Terno',
  description = 'Theatro Municipal de São Paulo- São Paulo',
  price,
  onClick,
}: Omit<ProductCardCartProps, 'id'> & { onClick?: () => void }) {
  return (
    <Stack
      w="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      className="shadow"
      direction="column"
      onClick={onClick}
      cursor="pointer"
    >
      <Box
        py="4"
        px="1"
        d="flex"
        flexDirection="column"
        height="100%"
        alignItems="flex-start"
        w="80%"
        mx="auto"
      >
        <Box>
          {price && (
            <Box d="flex" alignItems="baseline">
              <Badge
                borderRadius="full"
                px="2"
                bg="primary-c.500"
                color="secondary-c"
              >
                R$ {price}
              </Badge>
            </Box>
          )}
          <Text
            mt={price && '2'}
            fontWeight="semibold"
            wordBreak="break-word"
            fontSize="xl"
            lineHeight="tight"
            isTruncated
            whiteSpace="normal"
            w="100%"
          >
            {title}
          </Text>

          <Box as="p" mt="1">
            {parseLongString(description)}
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

export default ProductCardCart;
