"use client";
import React, { useEffect, useState } from 'react';
import Seat from './Seat';
import './TheaterOriginalCSS.css';

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
  const [theaterData, setTheaterData] = useState([]);

  useEffect (() => {
    
    if (typeof window !== 'undefined') {
      
      const urlParams = new URLSearchParams(window.location.search);
      const movieID = Number(urlParams.get('movieID'));
      const movieTitle = urlParams.get('movieTitle');
      const duration = Number(urlParams.get('duration'));
      const movieImage = urlParams.get('movieImage');
      const showTime = new Date(urlParams.get('showTime'));
      const theaterID = Number(urlParams.get('theaterID'));

      
      const data: BuyTicketProp = {
        movieID,
        movieTitle,
        duration,
        movieImage,
        showTime,
        theaterID,
      };

      setTicketData(data);
      

      fetch(`http://localhost:8080/theater/${theaterID}`).then((response) => {
        if (!response.ok) {
          throw new Error("Theater couldn't be fetched")
        }
        return response.json();
      }).then((theaterData) => {

        setTheaterData(theaterData)
      })     
    }
  }, []);

  if (!ticketData) {
    return <div>Loading...</div>;
  }
    
  const formattedDate = ticketData.showTime.toISOString().split('T')[0];
  const formattedTime = ticketData.showTime.toISOString().split('T')[1].substring(0,8);

  const theaterName = theaterData.name;
  const rows = theaterData.totalRows;
  const seatsPerRow = theaterData.seatsPerRow;
  const seats = theaterData.seats;

  console.log(seatsPerRow)
  console.log(rows)
  
  function generateSeats() {
    const seats = [];
  
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        // Create seat elements with appropriate classes
        seats.push(
          <div key={`seat-${row}-${seat}`} className={`seat`}></div>
        );
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