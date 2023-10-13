import React , {useEffect, useState} from 'react';
import { FC } from 'react';


interface SeatProp {
  id: number;
  priceWeight: number;
  row: number;
  numberInRow: number;
  onClick?: (id: number) => void;
  isSelected?: boolean;
  isBooked?: boolean;
}
/* props: SeatProp */
/* const const Seat = ({id, priceWeight, onClick}) => { */
const Seat: FC<SeatProp> = ({id, priceWeight, row, numberInRow, onClick, isSelected, isBooked}) => {
  const notBooked = `mb-2 w-6 h-8 rounded-t-lg hover:bg-orange-300 hover:cursor-pointer ${
    isSelected ? 'bg-blue-500' : 'bg-green-500'
  }`;

  const booked = `mb-2 w-6 h-8 rounded-t-lg hover:bg-orange-300 hover:cursor-pointer bg-red-500`;

  useEffect(() => {
    
  }, [isSelected]);

  return (
    <div 
    id={id}
    row={row}
    className={isBooked? booked: notBooked}
    onClick={onClick}>
    </div>
  )
};

export default Seat;

