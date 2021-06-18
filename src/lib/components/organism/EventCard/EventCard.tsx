import { Button } from '@chakra-ui/button';
import { Badge, Box } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';

import { EventCardProps } from 'lib/types/components';

import parseLongString from '@utils/parseLongString';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';
import { useCart } from '@contexts/CartProvider';

import ProductModal from '@organism/ProductModal';

import 'dayjs/locale/pt-br';

function EventCard({
  title,
  description,
  imgUrl,
  date,
  id,
  artists,
  products,
}: EventCardProps) {
  const { addToCart } = useCart();
  const { boughtProducts } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {artists.map((artist) => (
              <Badge
                key={artist.id}
                borderRadius="full"
                px="2"
                bg="primary-c.500"
                color="primary-c"
              >
                {artist.name}
              </Badge>
            ))}
          </Box>
          <Box d="flex" mt="2" alignItems="baseline">
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
          {boughtProducts?.filter(
            (bp) =>
              bp.product.filter(
                (p) => p.events.filter((e) => e.id === id).length,
              ).length,
          ).length ? (
            <Link href={`/evento/${id}`} passHref>
              <Button className="uppercase" size="md">
                Ver detalhes
              </Button>
            </Link>
          ) : products.length > 1 ? (
            <Button className="uppercase" size="md" onClick={onOpen}>
              Ver pacotes
            </Button>
          ) : (
            <Button
              className="uppercase"
              size="md"
              onClick={() => {
                if (!products.length) {
                  return router.push(`/evento/${id}`);
                }

                addToCart({
                  id: products[0].id,
                  title: products[0].title,
                  description: products[0].description,
                  price: products[0].price,
                });
              }}
            >
              {!products.length
                ? 'Assistir evento gratuito'
                : 'Adicionar ao carrinho'}
            </Button>
          )}
        </Box>

        <ProductModal isOpen={isOpen} onClose={onClose} products={products} />
      </Box>
    </Box>
  );
}

export default EventCard;
