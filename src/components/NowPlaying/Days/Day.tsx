"use client"
import React from 'react';

type DayProps = {
  date: Date;
  setSelectedDateIndex: (index: number) => void;
  isSelected?: boolean;
  index: number;
}

const Day = ({ date, setSelectedDateIndex, isSelected, index }: DayProps) => {
  const today = new Date();
  const dayForShowing = new Date(date);

  
  return (
    <div
      className={`flex flex-col items-center justify-center container h-14 w-60 p-4 ${
        isSelected ? 'bg-action-color' : 'bg-action-color'
      }`}
    >
      <button
        className={`text-white font-inter font-black absolute text-center w-56 h-12 ${
          isSelected ? 'bg-action-color' : 'bg-black'
        }`}
        onClick={() => setSelectedDateIndex(index)}
      >
        <p>
          {dayForShowing.getDate() !== today.getDate() ? dayForShowing.toLocaleDateString('en-UK', { weekday: 'long' }) + ' ' : 'Today '}
          the {' ' + dayForShowing.getDate() + ' '} / {' ' + dayForShowing.getMonth()}
          {}
        </p>
      </button>
    </div>
  );
};

export default Day;