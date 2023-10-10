"use client";
import React, { useState } from "react";
import DayRow from "./DayRow";
import MoviesPlaying from "../Movies/MoviesPlaying";

const todaysDate = new Date();


const DayTable = () => {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);

  const handleDateClick = (index: number) => {
    setSelectedDateIndex(index);
  };

  return (
    <>
      <div className="mt-20">
        <DayRow
          startDay={0}
          endDay={4}
          date={todaysDate}
          numberOfDays={4}
          selectedDateIndex={selectedDateIndex}
          setSelectedDateIndex={handleDateClick}
        />
        <DayRow
          startDay={4}
          endDay={8}
          date={todaysDate}
          numberOfDays={4}
          selectedDateIndex={selectedDateIndex}
          setSelectedDateIndex={handleDateClick}
        />
      </div>
      <MoviesPlaying/>
    </>
  );
};

export default DayTable;
