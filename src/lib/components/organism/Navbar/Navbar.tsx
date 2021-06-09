import { Button } from '@chakra-ui/button';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="h-20 w-screen flex items-center justify-between px-8 py-2 absolute top-0 z-50">
      <Image
        className="flex-grow"
        src="/img/logo.png"
        width="100"
        height="60"
        objectFit="contain"
      />
      <div className="flex-grow flex items-center justify-end">
        <Link href="/entrar" passHref>
          <Button
            className="uppercase"
            mr={2}
            bg="primary-c"
            color="white"
            size="sm"
            colorScheme="primary-c"
          >
            Entrar
          </Button>
        </Link>

        <Link href="/cadastrar" passHref>
          <Button
            className="uppercase"
            size="sm"
            color="white"
            borderColor="white"
            bg="transparent"
            colorScheme="primary-c"
            border="1px"
          >
            Cadastrar
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
