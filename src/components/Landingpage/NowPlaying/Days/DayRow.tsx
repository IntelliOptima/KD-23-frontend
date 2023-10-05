import React from 'react';
import Day from '@components/Landingpage/NowPlaying/Days/Day';

interface DayProps {
  date: Date;
  numberOfDays: number;
  startDay: number;
  endDay: number;
}
const DayRow: React.FC<DayProps> = ({ startDay, endDay, date, numberOfDays }) => {

  const dayElements = [];

  for (let index = 0; index < numberOfDays; index++) {
    // Create JSX elements and push them to the array
    const newDate = new Date(date)
    newDate.setDate(date.getDate() + index)
    dayElements.push(<Day key={index} date={newDate} />)};


  return (
    <div>{dayElements}</div>
  );
};

export default DayRow;