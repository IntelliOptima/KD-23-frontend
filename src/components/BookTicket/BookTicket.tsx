"use client";
import React, { useEffect, useState } from 'react';
import Seat from './Seat';
import Link from 'next/link';
import useCustomForm from '@/hooks/useForm';
import { Booking } from '@/Types/Types';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface BuyTicketProp {
  showID: number;
  price: number;
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
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [bookings, setBookings] = useState([]);  
  const router = useRouter();
  

  function convertToTwoDimensionalArray(oneDimensionalArray: any[], rows: number, seatsPerRow: number) {
    const twoDimensionalArray = [];
  
//     for (let row = 0; row < rows; row++) {
//       const rowArray = [];
//       for (let seat = 0; seat < seatsPerRow; seat++) {
        
//         const index = seat * seatsPerRow + row;
        
//         rowArray.push(oneDimensionalArray[index]);
//       }
      
//       twoDimensionalArray.push(rowArray);
//     }
  
//     return twoDimensionalArray;
//   }

//   useEffect (() => {
    
//     if (typeof window !== 'undefined') {
      
      const urlParams = new URLSearchParams(window.location.search);
      const showID = Number(urlParams.get('showID'))
      const price = Number(urlParams.get('price'));
      const movieID = Number(urlParams.get('movieID'));
      const movieTitle = urlParams.get('movieTitle');
      const duration = Number(urlParams.get('duration'));
      const movieImage = urlParams.get('movieImage');
      const showTime = new Date(urlParams.get('showTime'));
      const theaterID = Number(urlParams.get('theaterID'));

      const data: BuyTicketProp = {
        showID,
        price,
        movieID,
        movieTitle,
        duration,
        movieImage,
        showTime,
        theaterID,
      };      
      setTicketData(data);

      fetch(`http://localhost:8080/booking/find-all-by-movie-show/${showID}`).then((response) => {
        if (!response.ok){
          throw new Error("Bookings couldn't be fetched")
        }
        return response.json();
      }).then((bookingData) =>{
        setBookings(bookingData)
        console.log(bookingData)
      })


      fetch(`http://localhost:8080/theater/id=/${theaterID}`).then((response) => {
        if (!response.ok) {
          throw new Error("Theater couldn't be fetched")
        }
        return response.json();
      }).then((theaterData) => {

        setTheaterData(theaterData)
        console.log(theaterData)
      })
           
    }
  }, []);

  if (!ticketData || !theaterData) {
    return <div>Loading...</div>;
  }


//   const formattedDate = ticketData.showTime.toISOString().split('T')[0];
//   const formattedTime = ticketData.showTime.toISOString().split('T')[1].substring(0,8);

  const theaterName = theaterData.name;
  const showPrice = theaterData.price;
  const rows = theaterData.totalRows;
  const seatsPerRow = theaterData.seatsPerRow;
  const seats = theaterData.seats;
  const seatArray = convertToTwoDimensionalArray(seats, rows, seatsPerRow);


  const createBookingFetch  = async (email: string) => {
    const bookingsArrayForSubmit: Booking[] = [];
    selectedSeats.forEach(seat => {
      console.log(seat)
      const bookingForSubmit: Booking = {
        email: email,
        moviewShowId: ticketData.showID,
        seatId: seat,
      };
      console.log(bookingForSubmit)
      bookingsArrayForSubmit.push(bookingForSubmit);
    });    
     
    const objectAsJsonString = JSON.stringify(bookingsArrayForSubmit);
    console.log(objectAsJsonString)
    try {          
          const response = await fetch(`http://localhost:8080/booking`, {
            method: "POST",
            headers: {
            "content-type": "application/json"
          },          
            body: objectAsJsonString,
            credentials: "include",
          });
          if (!response.ok) {              
               const errorMessage = await response.text();
               console.log("Response is not OK");
              throw new Error(errorMessage);
          } else {                           
            console.log("OKAY POST DID GO WELL")                                        
            }
          } catch (error: any) {            
            console.log("The fetch resulted in an error", error);
        }                    
  
  };


  const toggleSeatSelection = (seatId: number) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
    
    generateTotalPrice(selectedSeats);
    
  };;

 
  function isSeatBooked(seatID: any){
    return bookings.some(booking => booking.seat.id == seatID)
  }
  

  function generateSeats() {
    const seatElements = [];
    for (let y = 0; y < seatArray.length; y++) {
      for (let x = 0; x < seatArray[y].length; x++) {
        seatElements.push(
          (!isSeatBooked(seatArray[x][y].id)) ?
          <Seat
            key={seatArray[x][y].id}
            id={seatArray[x][y].id}
            priceWeight={seatArray[x][y].priceWeight}
            row={seatArray[x][y].row}
            numberInRow={seatArray[x][y].numberInRow}
            isSelected={selectedSeats.includes(seatArray[x][y].id)}
            onClick={() => toggleSeatSelection(seatArray[x][y].id)}
            isBooked={false}
          /> :
          <Seat
            key={seatArray[x][y].id}
            id={seatArray[x][y].id}
            priceWeight={seatArray[x][y].priceWeight}
            row={seatArray[x][y].row}
            numberInRow={seatArray[x][y].numberInRow}
            isBooked={true}
          />

        );
      }
    }
    return seatElements;
  }

  function generateTotalPrice(selectedSeats: any[]){
    let totalPrice = 0;
    selectedSeats.forEach((element: number) => {
      
      totalPrice += (searchSeat(element).priceWeight * ticketData.price)
    });
    
    return totalPrice;
  }
  

  function searchSeat(seatId: number) {
    const foundSeat = seatArray.flat().find(seat => seat.id === seatId);
    return foundSeat;
  }

  
  const handleEmailInputSwal = async () => {    
    const { value: email } = await Swal.fire({
      title: 'Input email address for your booking',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
    });
  
      if (email) {
        Swal.fire(`Entered email: ${email}`)
             
        createBookingFetch(email);
        router.push('/')
      }
    }


  return (
    <div className='flex flex-col'>
      <div className="selected-seats flex flex-row">
      <h1 className="text-white w-20 h-50 mt-20">Valgte sæder</h1>
      <div className='flex flex-row space-x-2'>
        {selectedSeats.map((seat,index) => (
          <>
          <div className='flex flex-col bg-blue-500 p-2'>
          <p>ID:{seat}</p>
          <span>Række: {searchSeat(seat).row}</span>
          <span>Sæde: {searchSeat(seat).numberInRow}</span>
          <span></span>
          <span>Pris: {ticketData.price}</span>
          </div>
          </>
        ))}
      </div>
      </div>
      <div className='text-white mt-16'>
        <span>Total pris:  {generateTotalPrice(selectedSeats)}</span>
        
        <button 
        onClick={() => handleEmailInputSwal()}
        className='btn-primary ml-4' 
        >
          Book selected seats</button>
      </div>
      <div className="theatre flex flex-row items-center justify-center h-screen">
        <div className="w-[20%] grid grid-cols-10">{generateSeats()}</div>
      </div>
    </div>
  );
};

// export default BookTicket;