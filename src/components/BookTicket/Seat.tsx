import React , { MouseEventHandler } from 'react';



type SeatProp = {
  id: number;
  priceWeight: number;
  row: number;
  numberInRow: number;
  onClick?: (id: number) => void;
  isSelected?: boolean;
  isBooked: boolean;
}

/* props: SeatProp */
/* const const Seat = ({id, priceWeight, onClick}) => { */
const Seat = ({ id, priceWeight, row, numberInRow, onClick, isSelected, isBooked } :SeatProp ) => {

  const notBooked = `mb-2 w-6 h-8 rounded-t-lg hover:bg-orange-300 hover:cursor-pointer ${
    isSelected ? 'bg-blue-500' : 'bg-green-500'
  }`;

  const booked = `mb-2 w-6 h-8 rounded-t-lg bg-red-500`;


    const handleClick: MouseEventHandler<HTMLDivElement> = (event: React.MouseEvent<HTMLDivElement>) => {
      const id = parseInt(event.currentTarget.id);
      onClick(id);
    };

    return (
      <div
        id={id}
        row={row}
        priceweight={priceWeight}
        numberinrow={numberInRow}
        className={isBooked ? booked : notBooked}
        onClick={handleClick}
      />
    );
  };

 export default Seat;
