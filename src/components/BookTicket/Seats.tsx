import { Seat } from '@/Types/Types';
import React, { MouseEventHandler } from 'react';



type SeatProp = {
  seat: Seat;
  onClick?: (id: number) => void;
  isSelected?: boolean;
  isBooked: boolean;
  seatScewing: number;
  isLeftSideSeat: boolean;
}


const Seats = ({ seat, onClick, isSelected, isBooked, seatScewing, isLeftSideSeat }: SeatProp) => {

  const notBooked = `-mb-5 w-8 h-12 rounded-md hover:cursor-pointer transition-all duration-500 shadow ${!isSelected
      ? 'bg-gradient-to-t from-red-900 via-rose-900 to-red-400'
      : 'bg-rose-300'
    }`;


    function seatStyle(isLeftSideSeat:boolean) {
    if (!isLeftSideSeat){
      return {transform: `skew(-${seatScewing}deg)`};
    } else {
      return {transform: `skew(${seatScewing}deg)`};
    };
    }
   
  const booked = `-mb-5 w-8 h-12 rounded-md bg-gradient-to-t from-blue-900 via-blue-700 to-blue-400`;


  const handleClick: MouseEventHandler<HTMLDivElement> = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = parseInt(event.currentTarget.id);
    onClick &&
      onClick(id);
  };

  return (
    <div
      data-id={seat.id}
      data-row={seat.row}
      data-priceweight={seat.priceWeight}
      data-numberinrow={seat.numberInRow}
      className={isBooked ? booked : notBooked}
      onClick={handleClick}
      style={seatStyle(isLeftSideSeat)}
    />
  );
};

export default Seats;
