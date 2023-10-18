import BookTicket from '@/components/BookTicket/BookTicket';
import React from 'react';


const BookTicketPage = ({ params }: { params: { params: string[] } }) => {
  const [showId, showPrice, movieId, startTime, theaterId] = params.params.map(Number);

  return (
    <div>
      <BookTicket
        showId={showId}
        showPrice={showPrice}
        movieId={movieId}
        startTime={startTime}
        theaterId={theaterId}
      />
    </div>
  );
}

export default BookTicketPage;