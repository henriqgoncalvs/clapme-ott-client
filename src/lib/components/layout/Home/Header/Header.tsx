import { IoIosArrowDropdownCircle } from 'react-icons/io';

import styleguide from '@root/styleguide.json';

function Header() {
  return (
    <header className="h-screen text-solid-text-c relative flex items-start justify-end flex-col lg:items-end p-8 pb-32 mb-16">
      <h1 className="relative z-40 font-bold md:text-6xl leading-relaxed md:leading-snug lg:max-w-2xl">
        {styleguide.type.banner}
      </h1>
      <div className="absolute h-3/4 w-full bottom-0 left-0 z-20 bg-gradient-to-t from-solid-c via-solid-c lg:bg-gradient-to-l lg:h-full lg:w-full lg:right-0 lg:left-auto" />
      <div className="absolute h-3/4 w-full top-0 left-0 bg-gradient-to-b from-primary-c opacity-40 z-20 lg:bg-gradient-to-r lg:h-full lg:w-3/4" />
      <img
        src="/img/banner.png"
        className="absolute h-2/3 w-full z-10 top-0 left-0 lg:h-full lg:w-2/3 object-cover pointer-events-none"
      />
      <IoIosArrowDropdownCircle
        size={50}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse z-30 fill-current text-primary-c-500"
      />
    </header>
  );
}

export default Header;
