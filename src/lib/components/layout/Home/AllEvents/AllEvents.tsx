import { FaRegSadTear } from 'react-icons/fa';
import { Box } from '@chakra-ui/layout';

import { ProductI } from 'lib/types/api/product';

import EventCard from '@organism/EventCard';

type Props = {
  products: ProductI[];
};

function AllEvents({ products }: Props) {
  return (
    <section className="p-8 flex flex-col items-start max-w-screen-xl mx-auto">
      <h2 className="mb-12">Eventos passados</h2>
      <section className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 w-full items-stretch">
        {products.length ? (
          products?.map((product) => (
            <div
              key={product.events[0].id}
              className="w-full flex items-center justify-center"
            >
              <EventCard
                productId={product.id}
                title={product.events[0].title}
                description={product.events[0].description}
                date={product.events[0].premiere_date}
                id={product.events[0].id}
                imgUrl={product.events[0].banner || product.events[0].og_url}
                artists={product.events[0].artists}
              />
            </div>
          ))
        ) : (
          <Box
            w="100%"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            className="shadow"
            d="flex"
            flexDirection="column"
          >
            <Box
              p="6"
              d="flex"
              flexDirection="column"
              height="100%"
              flex="1"
              justifyContent="space-between"
            >
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
                Ainda não existem eventos passados
              </Box>
            </Box>
          </Box>
        )}
      </section>
    </section>
  );
}

export default AllEvents;
