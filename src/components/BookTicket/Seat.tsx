import React , {useState} from 'react';
import { FC } from 'react';

interface SeatProp {
  id: number;
  priceWeight: number;
}

const Seat: FC<SeatProp> = (props: SeatProp) => {
  return (
    <div className='mb-2 w-6 h-8 rounded-t-lg bg-orange-500 hover:bg-orange-300 hover:cursor-pointer'></div>
  )
};

export default Seat;

