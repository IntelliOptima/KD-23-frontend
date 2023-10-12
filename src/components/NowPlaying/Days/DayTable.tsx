"use client";
import React, { useState, useEffect } from "react";
import DayRow from "./DayRow";
import MoviesPlaying from "../Movies/MoviesPlaying";
import { Show } from "@/Types/Types";


const DayTable = () => {
  const todaysDate = new Date();
  
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);

  const handleDateClick = (index: number) => {
    setSelectedDateIndex(index);
    fetchMovieData(new Date(todaysDate.getDate() + selectedDateIndex));
  };
  
  const fetchMovieData = async (selectedDate: Date) => {
    const dateObj = new Date(selectedDate);
    const formattedDate = dateObj.toISOString().split('T')[0];

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIESHOW_API}/movie-show/find-all-by-date/${formattedDate}`);
      const data = await response.json();
      setShows(data);

    } catch (error) {
      console.error("Error fetching movie data:", error);
    };
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
      <MoviesPlaying movieShows={shows}/>
    </>
  );
};

export default DayTable;
