import React from "react";
import Day from "@components/NowPlaying/Days/Day";

interface DayProps {
  date: Date;
  numberOfDays: number;
  startDay: number;
  endDay: number;
}
const DayRow: React.FC<DayProps> = ({ startDay, endDay, date, numberOfDays }) => {
  const dayElements = [];

  for (let index = startDay; index < endDay; index++) {
    // Create JSX elements and push them to the array
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + index);
    dayElements.push(<Day key={index} date={newDate} />);
  }

  return (
    //<div>{dayElements}</div>

    <div className="mt-5 flex flex-wrap flex-row justify-center items-center gap-4">
      {dayElements.map((dayElement, index) => (
        <div key={index} className="">
          {dayElement}
        </div>
      ))}
    </div>
  );
};

export default DayRow;
