import { Button } from '@chakra-ui/button';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="h-20 w-full flex items-center justify-between px-8 py-2 fixed top-0 z-50 bg-solid-c">
      <Image
        className="flex-grow"
        src="/img/logo.png"
        width="100"
        height="60"
        objectFit="contain"
      />
      <div className="flex-grow flex items-center justify-end">
        <Link href="/entrar" passHref>
          <Button className="uppercase" mr={2}>
            Entrar
          </Button>
        </Link>

        <Link href="/cadastrar" passHref>
          <Button className="uppercase" variant="outline">
            Cadastrar
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
