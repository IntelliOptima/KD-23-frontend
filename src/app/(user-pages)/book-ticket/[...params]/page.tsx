"use client";
import BookTicket from '@/components/BookTicket/BookTicket';


const BookTicketPage = ({params} : {params: {showId: number, showPrice: number , movieId: number, startTime: number, theaterId: number}}) => {
    return (
        <div>
            <BookTicket 
            showId={params.showId}
            showPrice={params.showPrice} 
            movieId={params.movieId} 
            startTime={params.startTime} 
            theaterId={params.theaterId} />
        </div>
    );
};

export default BookTicketPage;