import { EventI } from 'lib/types/api/events';

import EventCard from '@organism/EventCard';

type Props = {
  nextEvents: EventI[];
};

function NextEvents({ nextEvents }: Props) {
  return (
    <section className="p-8 flex flex-col items-start max-w-screen-xl mx-auto">
      <h2 className="mb-12">Próximos eventos</h2>
      <section className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 w-full items-stretch">
        {nextEvents?.map((event) => (
          <div
            key={event.id}
            className="w-full flex items-center justify-center"
          >
            <EventCard
              title={event.title}
              description={event.description}
              date={event.premiere_date}
              id={event.id}
              imgUrl={event.og_url}
            />
          </div>
        ))}
      </section>
    </section>
  );
}

export default NextEvents;
