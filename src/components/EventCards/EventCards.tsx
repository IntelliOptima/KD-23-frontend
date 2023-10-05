import React from 'react'
import EventCard from './EventCard'
import eventCardsData from './eventCardsData.json';

const EventCards = () => {

    const eventCards = eventCardsData.eventcards;



    return (
        <div>

            <div className="flex flex-col items-center">

                <div className="my-8">
                    <h1 className="text-[80px] font-bold text-gray-500">EVENTS</h1>
                </div>

                <div className="flex justify-center gap-10 w-5/6">
                    <EventCard
                        title={eventCards[0].eventTitle}
                        duration={eventCards[0].eventDuration}
                        image={eventCards[0].eventImage}
                        date={eventCards[0].eventDate}
                        description={eventCards[0].eventDescription}
                    />

                    <EventCard
                        title={eventCards[1].eventTitle}
                        duration={eventCards[1].eventDuration}
                        image={eventCards[1].eventImage}
                        date={eventCards[1].eventDate}
                        description={eventCards[1].eventDescription}
                    />

                    <EventCard
                        title={eventCards[2].eventTitle}
                        duration={eventCards[2].eventDuration}
                        image={eventCards[2].eventImage}
                        date={eventCards[2].eventDate}
                        description={eventCards[2].eventDescription}
                    />

                </div>
            </div>
        </div>
    )
}

export default EventCards
