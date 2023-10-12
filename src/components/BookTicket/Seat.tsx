import React , {useState} from 'react';
import { FC } from 'react';


interface SeatProp {
  id: number;
  priceWeight: number;
  row: number;
  numberInRow: number;
  onClick?: (id: number) => void;
  isSelected?: boolean;
}
/* props: SeatProp */
/* const const Seat = ({id, priceWeight, onClick}) => { */
const Seat: FC<SeatProp> = ({id, priceWeight, row, numberInRow, onClick, isSelected}) => {
  const classList = `mb-2 w-6 h-8 rounded-t-lg hover:bg-orange-300 hover:cursor-pointer ${
    isSelected ? 'bg-blue-500' : 'bg-orange-500'
  }`;

  return (
    <div 
    id={id}
    priceWeight={priceWeight}
    row={row}
    numberInRow={numberInRow}
    className={classList}></div>
  )
};

export default Seat;

