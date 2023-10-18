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
  }, []);

  function convertToTwoDimensionalArray(oneDimensionalArray: Seat[], rows: number, seatsPerRow: number) {
    const twoDimensionalArray: Seat[][] = [];

    for (let row = 0; row < rows; row++) {
      const rowArray = [];
      for (let seat = 0; seat < seatsPerRow; seat++) {

        const index = row * seatsPerRow + seat;

        rowArray.push(oneDimensionalArray[index]);
      }

      twoDimensionalArray.push(rowArray);
    }

    return twoDimensionalArray;
  }

  if (!theaterData || !bookings) {
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





  const theaterRows = theaterData.totalRows;
  const theaterSeatsPerRow = theaterData.seatsPerRow;
  const seats = theaterData.seats;

  const seatArray = convertToTwoDimensionalArray(seats, theaterRows, theaterSeatsPerRow);
  const leftSideSeatArray = convertLeftSideSeatArray(seats, theaterRows, theaterSeatsPerRow)
  const rightSideSeatArray = convertRightSideSeatArray(seats, theaterRows, theaterSeatsPerRow)

  function convertLeftSideSeatArray(oneDimensionalArray: Seat[], rows: number, seatsPerRow: number) {
    const leftArray: Seat[][] = [];
    for (let row = 0; row < theaterRows; row++) {
      const oneRowArray = [];
      for (let seat = 0; seat < seatsPerRow / 2; seat++) {
        const index = row * seatsPerRow + seat;
        oneRowArray.push(oneDimensionalArray[index])
      }
      leftArray.push(oneRowArray);
    }
    return leftArray;
  }

  function convertRightSideSeatArray(oneDimensionalArray: Seat[], rows: number, seatsPerRow: number) {
    const rightArray: Seat[][] = [];
    for (let row = 0; row < theaterRows; row++) {
      const oneRowArray = [];
      for (let seat = 5; seat < seatsPerRow; seat++) {
        const index = row * seatsPerRow + seat;
        oneRowArray.push(oneDimensionalArray[index])
      }
      rightArray.push(oneRowArray);
    }
    return rightArray;
  }

  //const rightSideSeatArray;
  console.log(leftSideSeatArray)


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

    for (let rows = 0; rows < theaterRows; rows++) {
      for (let columns = 0; columns < theaterSeatsPerRow; columns++) {

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
/*
  function generateLeftSideSeats() {
    const leftSideSeatElements: JSX.Element[] = [];

    for (let seats = 0; seats < theaterSeatsPerRow / 2; seats++) {
      for (let rows = 0; rows < theaterRows; rows++) {
        const currentSeat = leftSideSeatArray[rows][seats];
        leftSideSeatElements.push(
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
    console.log(leftSideSeatElements)
    return leftSideSeatElements;
  }


  */


  function generateLeftSideSeats() {
    const leftSideSeatElements: JSX.Element[] = [];
  
    for (let seats = 0; seats < theaterSeatsPerRow / 2; seats++) {
      // Create a div for each column of seats
      const columnDiv = (
        <div key={seats} className={`flex flex-col mx-1`}>
          
          {Array.from({ length: theaterRows }, (_, rows) => {
            const currentSeat = leftSideSeatArray[rows][seats];
            return (
              <div key={currentSeat.id} className={`seat-wrapper h-1/${theaterRows}`}>
                {(currentSeat.id !== undefined && !isSeatBooked(currentSeat.id)) ? (
                  <Seats
                    seat={currentSeat}
                    isSelected={selectedSeats.includes(currentSeat)}
                    onClick={() => toggleSeatSelection(currentSeat)}
                    isBooked={false}
                  />
                ) : (
                  <Seats
                    seat={currentSeat}
                    isBooked={true}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
  
      leftSideSeatElements.push(columnDiv);
    }
  
    console.log(leftSideSeatElements);
    return leftSideSeatElements;
  }
  
  function generateRightSideSeats() {
    const rightSideSeatElements: JSX.Element[] = [];
  
    for (let seats = 0; seats < theaterSeatsPerRow / 2; seats++) {
    
      const columnDiv = (
        <div key={seats} className={`flex flex-col mx-1`}>
          
          {Array.from({ length: theaterRows }, (_, rows) => {
            const currentSeat = rightSideSeatArray[rows][seats];
            return (
              <div key={currentSeat.id} className={`seat-wrapper h-1/${theaterRows}`}>
                {(currentSeat.id !== undefined && !isSeatBooked(currentSeat.id)) ? (
                  <Seats
                    seat={currentSeat}
                    isSelected={selectedSeats.includes(currentSeat)}
                    onClick={() => toggleSeatSelection(currentSeat)}
                    isBooked={false}
                  />
                ) : (
                  <Seats
                    seat={currentSeat}
                    isBooked={true}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
  
      rightSideSeatElements.push(columnDiv);
    }
  
    return rightSideSeatElements;
  }


/*

  function generateRightSideSeats() {
    const rightSideSeatElements: JSX.Element[] = [];

    for (let seats = 0; seats < theaterSeatsPerRow / 2; seats++) {
      for (let rows = 0; rows < theaterRows; rows++) {

        const currentSeat = rightSideSeatArray[seats][seats];
        rightSideSeatElements.push(
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
    return rightSideSeatElements;
  }
*/
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
          <div className="flex flex-row items-center justify-center mr-3">
            {generateLeftSideSeats()}
          </div>
          <div className="flex flex-row items-center justify-center ml-3">
            {generateRightSideSeats()}
          </div>
        </div>
      </div>
    </>
  );
};
// <div className="w-[20%] grid grid-cols-10">{generateSeats()}</div>
export default BookTicket;