import { Seat } from '@/Types/Types';
import React , { MouseEventHandler } from 'react';



type SeatProp = {
  seat: Seat;
  onClick?: (id: number) => void;
  isSelected?: boolean;
  isBooked: boolean;
}


const Seats = ({ seat, onClick, isSelected, isBooked } :SeatProp ) => {

  const notBooked = `mb-2 w-6 h-8 rounded-7 ${
    isSelected ? 'bg-blue-500' : 'bg-green-500'
  }`;


  

 /* const notBooked = `mb-2 w-6 h-8 rounded-t-lg hover:bg-orange-300 hover:cursor-pointer ${
    isSelected ? 'bg-blue-500' : 'bg-green-500'
  }`; */

  const booked = `mb-2 w-6 h-8 rounded-t-lg bg-red-500`;


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
      />
    );
  };

 export default Seats;
