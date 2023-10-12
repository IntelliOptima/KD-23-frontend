import React , {useState} from 'react';
import { FC } from 'react';


interface SeatProp {
  id: number;
  priceWeight: number;
  row: number;
  numberInRow: number;
}
/* props: SeatProp */
/* const const Seat = ({id, priceWeight, onClick}) => { */
const Seat: FC<SeatProp> = ({id, priceWeight, row, numberInRow}) => {
  return (
    <div 
    id={id}
    priceWeight={priceWeight}
    row={row}
    numberInRow={numberInRow}
    className='mb-2 w-6 h-8 rounded-t-lg bg-orange-500 hover:bg-orange-300 hover:cursor-pointer'></div>
  )
};

export default Seat;

