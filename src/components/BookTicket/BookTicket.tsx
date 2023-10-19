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

const BookTicket = ({ showId, showPrice, theaterId, movieId }: BookTicketProp) => {
  
  const { theaterData, bookings, movie } = useGetBookings(showId, theaterId, movieId)
  console.log(movie)
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
      <div>
        <SeatingArea 
          theaterData={theaterData}
          bookings={bookings}
          movie={movie}
          showId={showId}
          showPrice={showPrice}
           />
      </div>
    </>
  );
};
export default BookTicket;