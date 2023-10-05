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

                    {eventCards.map((eventCard) => (
                        <EventCard
                            title={eventCard.eventTitle}
                            description={eventCard.eventDescription}
                            image={eventCard.eventImage}
                            date={eventCard.eventDate}
                            duration={eventCard.eventDuration}
                        />
                    ))}
                


                </div>
            </div>
        </div>
    )
}

export default EventCards
