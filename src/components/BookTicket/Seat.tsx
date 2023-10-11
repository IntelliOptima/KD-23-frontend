import React , {useState}from 'react';
import './Theater.css';

const Seat = ({ active, onClick }) => {
  const seatStyle = {
    width: '35px',
    height: '50px',
    borderRadius: '7px',
    cursor: 'pointer',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    margin: '0 6px',
  };

  if (active) {
    seatStyle.backgroundColor = 'green';
  }

  return (
    <div className="seat" style={seatStyle} onClick={onClick}></div>
  );
};

export default Seat;
