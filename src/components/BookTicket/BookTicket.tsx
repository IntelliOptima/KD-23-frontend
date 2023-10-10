"use client";
import React, { useState } from 'react';
import Seat from './Seat';


const BoockTicket = () => {
  // Initialize a 2D array to represent the seat selection state
  const [selectedSeats, setSelectedSeats] = useState(() => {
    const numRows = 10;
    const numSeatsPerRow = 10;
    const initialSelection = Array.from({ length: numRows }, () =>
      Array(numSeatsPerRow).fill(false)
    );
    return initialSelection;
  });

  const handleSeatClick = (rowIndex, seatIndex) => {
    setSelectedSeats((prevSelectedSeats) => {
      // Create a new copy of the selected seats state
      const newSelectedSeats = [...prevSelectedSeats];
      // Toggle the selected state of the clicked seat
      newSelectedSeats[rowIndex][seatIndex] = !newSelectedSeats[rowIndex][seatIndex];
      return newSelectedSeats;
    });
  };

  // Generate the rows and seats based on the selected state
  const rows = selectedSeats.map((row, rowIndex) => (
    <div className={`flex items-center space-x-4`} key={rowIndex}>
      {row.map((isSelected, seatIndex) => (
        <Seat
          key={seatIndex}
          active={isSelected}
          onClick={() => handleSeatClick(rowIndex, seatIndex)}
        />
      ))}
    </div>
  ));

  return (
    <div className="theatre flex justify-center items-center space-x-4">
      <div className="cinema-seats flex flex-col">{rows}</div>
      {/* Add the right side cinema seats here */}
    </div>
  );
};

export default BoockTicket;
