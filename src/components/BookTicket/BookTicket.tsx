"use client";
import React, { useEffect, useState } from 'react';
import { Booking, BookingRequest, Seat, MovieShow, Theater } from '@/Types/Types';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Seats from '@/components/BookTicket/Seats';
import { CirclesWithBar } from 'react-loader-spinner';


type BookTicketProp = {
  showId: number;
  showPrice: number;
  movieId: number;
  startTime: number;
  theaterId: number;
};

type TheaterProps = {
  type: string;
  id: number;
  implementationStrategy: void | null;
  name: string;
  totalRows: number;
  seatsPerRow: number;
  seats: Seat[];
}




const BookTicket = ({ showId, showPrice, theaterId }: BookTicketProp) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [theaterData, setTheaterData] = useState<TheaterProps | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const router = useRouter();

  const fetchBookingData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BOOKING_API}/find-all-by-movie-show/${showId}`);
      if (!response.ok) {
        console.log('Response not OK');
        return;
      }
      const data = await response.json();
      console.log(data)
      setBookings(data);
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  }


  const fetchTheaterData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_THEATER_API}/id=/${theaterId}`);
      if (!response.ok) {
        console.log('Response not OK');
        return;
      }
      const data = await response.json();
      console.log(data)
      setTheaterData(data);
    } catch (error) {
      console.error('Error fetching theater data:', error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchBookingData();
      await fetchTheaterData();
      setIsLoading(false);
    };

    fetchData();
  });

  function convertToTwoDimensionalArray(oneDimensionalArray: Seat[], rows: number, seatsPerRow: number) {
    const twoDimensionalArray: Seat[][] = [];

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

  if (!theaterData || !bookings ) {
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="flex justify-center">
      <CirclesWithBar
        height="100"
        width="100"
        color="#fff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={IsLoading}
        outerCircleColor="orange"
        innerCircleColor="red"
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </div>
  </div>
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
    const bookingsArrayForSubmit: BookingRequest[] = [];
    selectedSeats.forEach(seat => {
      if (seat.id === undefined) {
        console.log('Seat id is undefined, skipping this seat');
        return;
      }

      const bookingForSubmit: BookingRequest = {
        email: email,
        showId: showId,
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


  const toggleSeatSelection = (seat: Seat) => {
    selectedSeats.includes(seat) ? setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat))
      : setSelectedSeats([...selectedSeats, seat]);

    generateTotalPrice(selectedSeats);
  };


  function isSeatBooked(seatID: number) {
    return bookings.some(booking => booking.seat.id == seatID)
  }


  function generateSeats() {
    const seatElements: JSX.Element[] = [];
    for (let rows = 0; rows < seatArray.length; rows++) {
      for (let columns = 0; columns < seatArray[rows].length; columns++) {
        const currentSeat = seatArray[rows][columns];
        seatElements.push(
          (currentSeat.id !== undefined && !isSeatBooked(currentSeat.id)) ?
            <Seats
              key={currentSeat.id}
              seat={currentSeat}
              isSelected={selectedSeats.includes(currentSeat)}
              onClick={() => toggleSeatSelection(currentSeat)}
              isBooked={false}
            /> :
            <Seats
              key={currentSeat.id}
              seat={currentSeat}
              isBooked={true}
            />
        );
      }
    }
    return seatElements;
  }



  function generateTotalPrice(selectedSeats: Seat[]) {
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
    <>

      {IsLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="flex justify-center">
            <CirclesWithBar
              height="100"
              width="100"
              color="#fff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={IsLoading}
              outerCircleColor="orange"
              innerCircleColor="red"
              barColor=""
              ariaLabel="circles-with-bar-loading"
            />
          </div>
        </div>
      )}
      <div className='flex flex-col'>
        <div className="selected-seats flex flex-row">
          <h1 className="text-white w-20 h-50 mt-20">Valgte sæder</h1>
          <div className='flex flex-row space-x-2'>
            {selectedSeats.map((seat, index) => (
              <div className='flex flex-col bg-blue-500 p-2' key={index}>
                <p>ID:{seat.id}</p>
                <span>Række: {seat.row}</span>
                <span>Sæde: {seat.numberInRow}</span>
                <span></span>
                <span>Pris: {showPrice}</span>
              </div>
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
    </>
  );
};

export default BookTicket;