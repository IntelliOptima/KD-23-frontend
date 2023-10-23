import React from 'react';
import BookTicket from '@/components/BookTicket/BookTicket';

const BookTicketPage = ({ searchParams }: {
  searchParams: {
    showId: string;
    showPrice: string;
    movieId: string;
    startTime: string;
    theaterId: string;
  }
}) => {
  
console.log(searchParams.theaterId)

/*
return(<div>
    <div className='text-white'>{searchParams.showId}</div>
    <div className='text-white'>{searchParams.showPrice}</div>
    <div className='text-white'>{searchParams.movieId}</div>
    <div className='text-white'>{searchParams.startTime}</div>
    <div className='text-white'>{searchParams.theaterId}</div>
    </div>)
*/
  return (
    <div>
      <BookTicket
        showId={parseInt(searchParams.showId)}
        showPrice={parseInt(searchParams.showPrice)}
        movieId={parseInt(searchParams.movieId)}
        startTime={new Date(searchParams.startTime)}
        theaterId={parseInt(searchParams.theaterId)}
      />
    </div>
  ) 
}; 

export default BookTicketPage;