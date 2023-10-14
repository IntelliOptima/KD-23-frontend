import React, {Dispatch, SetStateAction} from "react";
import Day from "@components/NowPlaying/Days/Day";

type DayProps = {
  date: Date;
  numberOfDays: number;
  startDay: number;
  endDay: number;
  selectedDateIndex: number;
  setSelectedDateIndex: Dispatch<SetStateAction<number>>;
}

const DayRow = ({ startDay, endDay, date, numberOfDays, selectedDateIndex, setSelectedDateIndex }: DayProps) => {
  const dayElements = [];

  for (let index = startDay; index < endDay; index++) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + index);
    dayElements.push(
      <Day
        key={index}
        date={newDate}
        setSelectedDateIndex={setSelectedDateIndex}
        isSelected={selectedDateIndex === index}
        index={index}
      />
    );
  }

  return (
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