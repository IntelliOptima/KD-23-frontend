import Image from 'next/image';
import React from 'react'

type EventCardProps = {
    title: string;
    duration: string;
    image: string;
    date: string;
    description: string;
}

const EventCard = ({ title, duration, image, date, description }: EventCardProps) => {


    return (
        <div>

            <div className="flex flex-col justify-between items-center h-[400px] w-[320px] bg-white rounded-2xl px-4 py-4 h-full">
                <div className="w-full">
                    <h3 className="text-[20px] font-bold text-left">{title}</h3>
                </div>
                <div className="w-full">
                    <p className="text-left text-gray-500 font-bold">{duration}</p>
                </div>
                <div className="relative h-[150px] w-[270px]">
                    <Image
                        src={image}
                        fill={true}
                        alt="event image"
                    />
                </div>
                <div className="w-full">
                    <p className="text-left text-gray-500 font-bold py-2">{date}</p>
                </div>
                <div className="w-full">
                    <p className="text-left text-[14px] py-2">{description}</p>
                </div>
                <div className="flex justify-center items-end w-full my-4">
                    <button className="btn-primary">Buy Ticket</button>
                </div>
            </div>

        </div>
    )
}

export default EventCard