"use client";
import React, { useEffect, useState } from 'react';
import Seat from './Seat';

interface BuyTicketProp {
  movieID: number;
  movieTitle: string;
  duration: number;
  movieImage: string;
  showTime: Date;
  theaterID: number;
}

const BookTicket = () => {
  const [ticketData, setTicketData] = useState<BuyTicketProp | null>(null);

  useEffect(() => {
    // Ensure the code is running on the client side
    if (typeof window !== 'undefined') {
      // Extract query parameters directly from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const movieID = Number(urlParams.get('movieID'));
      const movieTitle = urlParams.get('movieTitle');
      const duration = Number(urlParams.get('duration'));
      const movieImage = urlParams.get('movieImage');
      const showTime = new Date(urlParams.get('showTime'));
      const theaterID = Number(urlParams.get('theaterID'));

      // Create the ticketData object
      const data: BuyTicketProp = {
        movieID,
        movieTitle,
        duration,
        movieImage,
        showTime,
        theaterID,
      };

      setTicketData(data);
    }
  }, []);

  if (!ticketData) {
    return <div>Loading...</div>;
  }

  const formattedDate = ticketData.showTime.toISOString().split('T')[0];
  const formattedTime = ticketData.showTime.toISOString().split('T')[1].substring(0,8);


  function generateSeats() {
    const seats = [];

    for (let row = 1; row <= 20; row++) {
      for (let seat = 1; seat <= 20; seat++) {
        seats.push(<Seat key={`seat-${row}-${seat}`} />);
      }
    }

    return seats;
  }

  return (
    <div className="theatre">
      <div className="cinema-seats">{generateSeats()}</div>
    </div>
  );
};

export default BookTicket;