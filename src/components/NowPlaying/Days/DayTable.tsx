"use client";
import React, { useState, useEffect, useMemo } from "react";
import DayRow from "./DayRow";
import MoviesPlaying from "../Movies/MoviesPlaying";
import { MovieShow } from "@/Types/Types";



const DayTable = () => {
  const todaysDate = useMemo(() => new Date(), []);
  
  const [shows, setShows] = useState<MovieShow[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  

  useEffect(() => {
    const newDate = new Date(todaysDate);  
    newDate.setDate(newDate.getDate() + selectedDateIndex);  
    fetchMovieData(newDate);  
  }, [selectedDateIndex, todaysDate]);
  
  const fetchMovieData = async (selectedDate: Date) => {
    const dateObj = new Date(selectedDate);
    const formattedDate = dateObj.toISOString().split('T')[0];

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIESHOW_API}/find-all-by-date/${formattedDate}`);
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
          setSelectedDateIndex={setSelectedDateIndex}
        />
        <DayRow
          startDay={4}
          endDay={8}
          date={todaysDate}
          numberOfDays={4}
          selectedDateIndex={selectedDateIndex}
          setSelectedDateIndex={setSelectedDateIndex}
        />
      </div>
      <MoviesPlaying movieShows={shows}/>
    </>
  );
};

export default DayTable;
