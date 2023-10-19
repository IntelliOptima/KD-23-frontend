import { Seat, Booking, TheaterProps } from "@/Types/Types";
import { useState } from "react";
import TicketMenu from "./TicketMenu";
import Seats from "./Seats";


interface SeatingAreaProp {
    theaterData: TheaterProps;
    bookings: Booking[];
    showId: number;
    showPrice: number;
}

const SeatingArea = ({ theaterData, bookings, showId, showPrice }: SeatingAreaProp) => {
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const theaterRows = theaterData.totalRows;
    const theaterSeatsPerRow = theaterData.seatsPerRow;
    const seats = theaterData.seats;

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

    return (<>
        <div className='flex flex-col'>
            <TicketMenu selectedSeats={selectedSeats} showPrice={showPrice} showId={showId} />
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


    )

}


export default SeatingArea;