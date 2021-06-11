import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import {
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
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@contexts/AuthProvider/AuthProvider';

import EventCardCart from '@organism/Cart/EventCardCart';

function Navbar() {
  const btnSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const { isAuthenticated, logout } = useAuth();

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
                <Button
                  aria-label="Perfil"
                  size={btnSize}
                  leftIcon={<FaUserCircle />}
                  className="uppercase"
                >
                  Meus dados
                </Button>
              </Link>
              <Button
                size={btnSize}
                className="uppercase"
                leftIcon={<FiLogOut />}
                onClick={logout}
              >
                Sair
              </Button>
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
                <PopoverBody py={5}>
                  <Stack
                    divider={<StackDivider />}
                    direction={{ base: 'column', lg: 'row' }}
                    spacing={{ base: '10', lg: '12' }}
                    mb={4}
                  >
                    <EventCardCart
                      title="O Terno"
                      description="Apresentação da banda O Terno"
                      date="12 MAI - 22H"
                      imgUrl="/img/o-terno.png"
                    />
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
