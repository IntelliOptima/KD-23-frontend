"use client";
import React, { useState } from 'react';
import { BookingRequest, Seat } from '@/Types/Types';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Seats from '@/components/BookTicket/Seats';
import { CirclesWithBar } from 'react-loader-spinner';
import useGetBookings from '@/hooks/useGetBookings';



type BookTicketProp = {
  showId: number;
  showPrice: number;
  movieId: number;
  startTime: number;
  theaterId: number;
};





const BookTicket = ({ showId, showPrice, theaterId }: BookTicketProp) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const router = useRouter();
  const {theaterData, bookings, IsLoading} = useGetBookings(showId, theaterId)

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
  
  function generateLeftSideSeats() {
    const leftSideSeatElements: JSX.Element[] = [];

    for (let seats = 0; seats < theaterSeatsPerRow / 2; seats++) {
      const columnDiv = (
        <div key={seats} className={`flex flex-col mx-2`}>

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
                    seatScewing={2}
                    isLeftSideSeat={true}
                  />
                ) : (
                  <Seats
                    seat={currentSeat}
                    isBooked={true}
                    seatScewing={2}
                    isLeftSideSeat={true}
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
      let rowScewing = 7 + seats * 2;
      
      const columnDiv = (
        <div key={seats} className={`flex flex-col mx-2 skew-x-${rowScewing}`}>
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
                      seatScewing={8 + (seats * 2)}
                      isLeftSideSeat={false}
                    />
                  ) : (
                    <Seats
                      seat={currentSeat}
                      isBooked={true}
                      seatScewing={8 + (seats * 2)}
                      isLeftSideSeat={false}
                    />
                  )}
                </div>
              );
            })}
          
        </div>
      );

      rightSideSeatElements.push(columnDiv);
      console.log(rowScewing)
      rowScewing = 0;
    }

    return rightSideSeatElements;
  }


  return (
    <>
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
export default BookTicket;