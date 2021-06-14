import { ProductI } from 'lib/types/api/product';

import EventCard from '@organism/EventCard';

type Props = {
  nextProducts: ProductI[];
};

function NextEvents({ nextProducts }: Props) {
  return (
    <section className="p-8 flex flex-col items-start max-w-screen-xl mx-auto">
      <h2 className="mb-12">Próximos eventos</h2>
      <section className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 w-full items-stretch">
        {nextProducts?.map((product) => (
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
        ))}
      </section>
    </section>
  );
}

export default NextEvents;
