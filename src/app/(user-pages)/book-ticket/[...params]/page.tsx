"use client";
import BookTicket from '@/components/BookTicket/BookTicket';


const BookTicketPage = (showId: number, showPrice: number , movieId: number, startTime: number, theaterId: number) => {
    return (
        <div>
            <BookTicket 
            showId={showId}
            showPrice={showPrice} 
            movieId={movieId} 
            startTime={startTime} 
            theaterId={theaterId} />
        </div>
    );
};

export default BookTicketPage;