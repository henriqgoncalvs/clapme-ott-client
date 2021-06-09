import { Heading } from '@chakra-ui/react';

import styleguide from '@root/styleguide.json';

function Header() {
  return (
    <header className="h-screen text-solid-text-c relative bg-header-banner bg-center bg-cover flex items-start justify-end flex-col p-8">
      <Heading as="h1" size="3xl" lineHeight="short" className="relative z-20">
        {styleguide.type.banner}
      </Heading>
      <div className="absolute h-3/4 w-full top-0 left-0 bg-gradient-to-b from-primary-c opacity-40 z-10" />
      <div className="absolute h-3/4 w-full bottom-0 left-0 z-10 bg-gradient-to-t from-solid-c" />
    </header>
  );
}

export default Header;
