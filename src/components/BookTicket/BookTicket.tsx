"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useCustomForm from '@/hooks/useForm';
import { Booking, SeatType, Show, Theater } from '@/Types/Types';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Seat from '@/components/BookTicket/Seat';



type BookTicketProp = {
  showId: number;
  showPrice: number;
  movieId: number;
  startTime: number;
  theaterId: number;
};

type TheaterProps = {
  id: number;
  name: string;
  type: string;
  totalRows: number;
  seatsPerRow: number;
  seats: SeatType[];
}




const BookTicket = ({ showId, showPrice , movieId, startTime, theaterId }: BookTicketProp) => {
  const [ticketData, setTicketData] = useState<BookTicketProp | null>(null);
  const [theaterData, setTheaterData] = useState<TheaterProps | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();


  function convertToTwoDimensionalArray(oneDimensionalArray: SeatType[], rows: number, seatsPerRow: number) {
    const twoDimensionalArray: SeatType[][] = [];

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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BOOKING_API}/find-all-by-movie-show/${showId}`).then((response) => {
      if (!response.ok) {
        throw new Error("Bookings couldn't be fetched")
      }
      return response.json();
    }).then((bookingData) => {
      setBookings(bookingData)
      console.log(bookingData)
    })


    fetch(`${process.env.NEXT_PUBLIC_THEATER_API}/id=/${theaterId}`).then((response) => {
      if (!response.ok) {
        throw new Error("Theater couldn't be fetched")
      }
      return response.json();
    }).then((theaterData) => {

      setTheaterData(theaterData)
      console.log(theaterData)
    })

  }, []);

if (!ticketData || !theaterData) {
  return <div>Loading...</div>;
}

/*
  const formattedDate = ticketData.showTime.toISOString().split('T')[0];
  const formattedTime = ticketData.showTime.toISOString().split('T')[1].substring(0,8);
*/


const rows = theaterData.totalRows;
const seatsPerRow = theaterData.seatsPerRow;
const seats = theaterData.seats;
const seatArray = convertToTwoDimensionalArray(seats, rows, seatsPerRow);


const createBookingFetch = async (email: string) => {
  const bookingsArrayForSubmit: Booking[] = [];
  selectedSeats.forEach(seat => {
    console.log(seat)
    const bookingForSubmit: Booking = {
      email: email,
      movieShowId: showId,
      seatId: seat.id,
    };
    console.log(bookingForSubmit)
    bookingsArrayForSubmit.push(bookingForSubmit);
  });

  const objectAsJsonString = JSON.stringify(bookingsArrayForSubmit);
  console.log(objectAsJsonString)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BOOKING_API}`, {
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


const toggleSeatSelection = (seat: SeatType) => {
selectedSeats.includes(seat) ? setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat)) 
: setSelectedSeats([...selectedSeats, seat]);
   
  generateTotalPrice(selectedSeats);
};


function isSeatBooked(seatID: number) {
  return bookings.some(booking => booking.seatId == seatID)
}


function generateSeats() {
  const seatElements = [];
  for (let rows = 0; rows < seatArray.length; rows++) {
    for (let colmuns = 0; colmuns < seatArray[rows].length; colmuns++) {
      seatElements.push(
        (!isSeatBooked(seatArray[colmuns][rows].id)) ?
          <Seat
            key={seatArray[colmuns][rows].id}
            id={seatArray[colmuns][rows].id}
            priceWeight={seatArray[colmuns][rows].priceWeight}
            row={seatArray[colmuns][rows].row}
            numberInRow={seatArray[colmuns][rows].numberInRow}
            isSelected={selectedSeats.includes(seatArray[colmuns][rows])}
            onClick={() => toggleSeatSelection(seatArray[colmuns][rows])}
            isBooked={false}
          /> :
          <Seat
            key={seatArray[colmuns][rows].id}
            id={seatArray[colmuns][rows].id}
            priceWeight={seatArray[colmuns][rows].priceWeight}
            row={seatArray[colmuns][rows].row}
            numberInRow={seatArray[colmuns][rows].numberInRow}
            isBooked={true}
          />

      );
    }
  }
  return seatElements;
}



function generateTotalPrice(selectedSeats: SeatType[]) {
  let totalPrice = 0;
  selectedSeats.forEach((seat) => {

    totalPrice += (seat.priceWeight * showPrice)
  });

  return totalPrice;
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
        {selectedSeats.map((seat, index) => (
          <>
            <div className='flex flex-col bg-blue-500 p-2'>
              <p>ID:{seat.id}</p>
              <span>Række: {seat.row}</span>
              <span>Sæde: {seat.numberInRow}</span>
              <span></span>
              <span>Pris: {ticketData.showPrice}</span>
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

export default BookTicket;