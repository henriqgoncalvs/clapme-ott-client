import EventCard from '@organism/EventCard';

function NextEvents() {
  return (
    <section className="p-8 flex flex-col items-start max-w-screen-xl mx-auto">
      <h2 className="mb-12">Próximos eventos</h2>
      <section className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 w-full items-stretch">
        <div className="w-full flex items-center justify-center">
          <EventCard
            title="O Terno"
            description="Apresentação da banda O Terno"
            date="12 MAI - 22H"
            id={1}
            imgUrl="/img/o-terno.png"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <EventCard
            title="Dance Gavin Dance"
            description="Apresentação da banda Dance Gavin Dance faksdlfjasl;dkfjal;sdjfl;asdjkfl;ajdfl;adjkfl;adsjkf;"
            date="21 MAI - 22H"
            id={1}
            imgUrl="/img/dgd.jpg"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <EventCard
            title="O Terno"
            description="Apresentação da banda O Terno"
            date="12 MAI - 22H"
            id={1}
            imgUrl="/img/o-terno.png"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <EventCard
            title="Dance Gavin Dance"
            description="Apresentação da banda Dance Gavin Dance"
            date="21 MAI - 22H"
            id={1}
            imgUrl="/img/dgd.jpg"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <EventCard
            title="O Terno"
            description="Apresentação da banda O Terno"
            date="12 MAI - 22H"
            id={1}
            imgUrl="/img/o-terno.png"
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <EventCard
            title="Dance Gavin Dance"
            description="Apresentação da banda Dance Gavin Dance"
            date="21 MAI - 22H"
            id={1}
            imgUrl="/img/dgd.jpg"
          />
        </div>
      </section>
    </section>
  );
}

export default NextEvents;
