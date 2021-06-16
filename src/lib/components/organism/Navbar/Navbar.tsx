import { FaRegSadTear, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Link as ChakraLink,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  StackDivider,
  useBreakpointValue,
  useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';
import { useCart } from '@contexts/CartProvider';

import EventCardCart from '@organism/Cart/EventCardCart';

function Navbar() {
  const [isMobile] = useMediaQuery('(max-width: 512px)');
  const btnSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="h-20 w-screen flex items-center justify-between px-8 py-2 fixed top-0 z-50 bg-solid-c">
      <Link href="/" passHref>
        <ChakraLink>
          <Image
            className="flex-grow"
            src="/img/logo.png"
            width="100"
            height="60"
            objectFit="contain"
          />
        </ChakraLink>
      </Link>
      <div className="flex-grow flex items-center justify-end">
        <ButtonGroup spacing={3}>
          {isAuthenticated ? (
            <>
              <Link href="/perfil" passHref>
                {isMobile ? (
                  <IconButton aria-label="Perfil" icon={<FaUserCircle />} />
                ) : (
                  <Button
                    aria-label="Perfil"
                    size={btnSize}
                    leftIcon={<FaUserCircle />}
                    className="uppercase"
                  >
                    Meus dados
                  </Button>
                )}
              </Link>
              {isMobile ? (
                <IconButton aria-label="Sair" icon={<FiLogOut />} />
              ) : (
                <Button
                  size={btnSize}
                  className="uppercase"
                  leftIcon={<FiLogOut />}
                  onClick={logout}
                >
                  Sair
                </Button>
              )}
            </>
          ) : (
            <Link href="/entrar" passHref>
              <Button className="uppercase" size={btnSize}>
                Entrar
              </Button>
            </Link>
          )}

          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger>
                <IconButton
                  variant="outline"
                  aria-label="Carrinho"
                  icon={<FaShoppingCart />}
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Adicionado ao carrinho</PopoverHeader>
                <PopoverBody py={5} overflowY="scroll" maxH="70vh">
                  <Stack
                    divider={<StackDivider />}
                    direction="column"
                    spacing={{ base: '10', lg: '4' }}
                    mb={4}
                  >
                    {cart.length > 0 ? (
                      cart.map((cartItem) => (
                        <EventCardCart
                          productId={cartItem.productId}
                          key={cartItem.id}
                          title={cartItem.title}
                          description={cartItem.description}
                          date={cartItem.date}
                          imgUrl={cartItem.imgUrl}
                        />
                      ))
                    ) : (
                      <Box
                        mt="2"
                        fontWeight="semibold"
                        as="h4"
                        fontSize="xl"
                        lineHeight="tight"
                        d="flex"
                        alignItems="flex-start"
                      >
                        <FaRegSadTear className="mr-3 mt-1" fontSize={30} />
                        Seu carrinho está vazio
                      </Box>
                    )}
                  </Stack>
                  <Link href="/carrinho" passHref>
                    <Button as="a" size="sm" w="100%" mx="auto">
                      Ver carrinho
                    </Button>
                  </Link>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/cadastro" passHref>
              <Button className="uppercase" variant="outline" size={btnSize}>
                Cadastrar
              </Button>
            </Link>
          )}
        </ButtonGroup>
      </div>
    </nav>
  );
}

export default Navbar;
