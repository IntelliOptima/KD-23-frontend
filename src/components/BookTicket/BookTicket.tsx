"use client";
import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';
import useGetBookings from '@/hooks/useGetBookings';
import SeatingArea from './SeatingArea';

type BookTicketProp = {
  showId: number;
  showPrice: number;
  movieId: number;
  startTime: number;
  theaterId: number;
};

const BookTicket = ({ showId, showPrice, theaterId }: BookTicketProp) => {
  
  const { theaterData, bookings } = useGetBookings(showId, theaterId)

  if (!theaterData || !bookings) {
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="flex justify-center">
        <CirclesWithBar
          height="100"
          width="100"
          color="#fff"
          wrapperStyle={{}}
          wrapperClass=""
          
          outerCircleColor="orange"
          innerCircleColor="red"
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      </div>
    </div>
  }

  return (
    <>
      <div className='flex flex-col'>
        
        <SeatingArea 
          theaterData={theaterData}
          bookings={bookings}
          showId={showId}
          showPrice={showPrice}
           />
      </div>
    </>
  );
};
export default BookTicket;