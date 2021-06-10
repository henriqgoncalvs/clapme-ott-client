import Header from '@layout/Home/Header';
import NextEvents from '@layout/Home/NextEvents';

import Navbar from '@organism/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <NextEvents />
    </>
  );
}
