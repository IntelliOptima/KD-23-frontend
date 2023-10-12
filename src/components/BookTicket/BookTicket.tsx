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
  const [theaterData, setTheaterData] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);
  
  

  function convertToTwoDimensionalArray(oneDimensionalArray, rows, seatsPerRow) {
    const twoDimensionalArray = [];
  
    for (let row = 0; row < rows; row++) {
      const rowArray = [];
      for (let seat = 0; seat < seatsPerRow; seat++) {
        
        const index = seat * seatsPerRow + row;
        
        rowArray.push(oneDimensionalArray[index]);
      }
      
      twoDimensionalArray.push(rowArray);
    }
  
    return twoDimensionalArray;
  }

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
  console.log(seats)
  const seatArray = convertToTwoDimensionalArray(seats, rows, seatsPerRow);

  console.log(seats)

  function generateSeats() {
    const seatElements = [];
    for (let y = 0; y < seatArray.length; y++) {
      for (let x = 0; x < seatArray.length; x++) {
        seatElements.push(<Seat
        key={seatArray[y][x].id} 
        id={seatArray[x][y].id}
        priceWeight={seatArray[x][y].priceWeight}
        row={seatArray[x][y].row}
        numberInRow={seatArray[x][y].numberInRow}
        />)
      }
      
    }
  
    return seatElements;
  }
  




  return (
   <div className={"theatre flex flex-row items-center justify-center h-screen"}>
    <div className={`w-[20%] grid grid-cols-10`}>
      {generateSeats()}
    </div>
   </div>
  );
};


export default BookTicket;