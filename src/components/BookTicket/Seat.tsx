import React , {useState}from 'react';
import style from './BookTicketCss.module.css';

const Seat = ({ active, onClick }) => {
  return (
    <div
      className={`group w-35 h-50 rounded-7 cursor-pointer bg-gradient-to-top from-#761818 via-#B54041 to-#F3686A mb-10 mt--32 shadow-5 hover:bg-red-400 ${
        active ? 'bg-green-500' : ''
      }`}
      onClick={onClick}
    ></div>
  );
};

export default Seat;

