import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';

import { ProductI } from 'lib/types/api/product';

import { useCart } from '@contexts/CartProvider';

import ProductCardCart from '@organism/Cart/ProductCardCart';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  products: ProductI[];
};

function ProductModal({ isOpen, onClose, products }: Props) {
  const { addToCart } = useCart();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="80vw" maxW="500px">
        <ModalHeader>Pacotes que contém o evento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={{ base: '4', lg: '6' }} direction="column">
            {products.map((product) => (
              <ProductCardCart
                key={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                onClick={() => {
                  addToCart({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                  });
                  onClose();
                }}
              />
            ))}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProductModal;
