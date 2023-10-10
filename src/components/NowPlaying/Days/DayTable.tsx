"use client";
import React, { useState, useEffect } from "react";
import DayRow from "./DayRow";
import MoviesPlaying from "../Movies/MoviesPlaying";



const todaysDate = new Date();


const DayTable = () => {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [movieData, setMovieData] = useState([]);

  const handleDateClick = (index: number) => {
    setSelectedDateIndex(index);
  };

  
  const fetchMovieData = async (selectedDate: string | number | Date) => {

    const dateObj = new Date(selectedDate);

    const yyyyMmDdDate = dateObj.toISOString().split('T')[0];

    try {
      const response = await fetch(`http://localhost:8080/movie-show/find-all-by-date/${yyyyMmDdDate}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      
      return [];
    }
  };

  useEffect(() => {
    
    const selectedDate = new Date();
    selectedDate.setDate(todaysDate.getDate() + selectedDateIndex);
    fetchMovieData(selectedDate).then((data) => {
      setMovieData(data);
    });
  }, [selectedDateIndex]);



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
      <MoviesPlaying movieData={movieData}/>
    </>
  );
};

export default DayTable;
