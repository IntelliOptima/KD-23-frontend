import React, {useState} from 'react';
import './Theater.css'; // Import the CSS file

type SeatProps = {
    active: boolean;
    onClick: () => void;
};

const Seat: React.FC<SeatProps> = ({ active, onClick }) => {
  const seatClasses = `seat ${active ? 'active' : ''}`;
  
  return (
    <div className={seatClasses} onClick={onClick}></div>
  );
};

export default Seat;