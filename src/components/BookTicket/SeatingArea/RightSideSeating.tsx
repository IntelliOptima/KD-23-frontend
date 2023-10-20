import React from 'react';
import Seats from './Seats';
import { Seat } from '@/Types/Types';

type RightSideSeatsProp = {
  rightSideSeatArray: Seat[][];
  selectedSeats: Seat[];
  toggleSeatSelection: (seat: Seat) => void;
  isSeatBooked: (seatID: number) => boolean;
};

const RightSideSeats = ({ rightSideSeatArray, selectedSeats, toggleSeatSelection, isSeatBooked }: RightSideSeatsProp) => {
  return (
    <div className="right-side-seats-container">
      {rightSideSeatArray.map((column, seats) => (
        <div
          key={`right-side-column-${seats}`}
          className="right-side-column"
          style={{ transform: `skew(${7 + seats * 2}deg)` }}
        >
          {column.map((currentSeat) => (
            <div key={currentSeat.id} className="right-side-seat">
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
          ))}
        </div>
      ))}
    </div>
  );
};

export default RightSideSeats;