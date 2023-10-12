"use client";
import React, { useState, useEffect } from "react";
import DayRow from "./DayRow";
import MoviesPlaying from "../Movies/MoviesPlaying";



const todaysDate = new Date();


const DayTable = () => {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [movieData, setMovieData] = useState([]);
  const numberOfDays = 8;

  const handleDateClick = (index: number) => {
    setSelectedDateIndex(index);
  };

  
  const fetchMovieData = async (selectedDate: string | number | Date) => {

    const dateObj = new Date(selectedDate);

    const yyyyMmDdDate = dateObj.toISOString().split('T')[0];

    try {
      const response = await fetch(`http://localhost:8080/movie-show/find-all-by-date/${yyyyMmDdDate}`);
      const data = await response.json();
      return formatFetchedData(data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      
      return [];
    };
  };

  
  function formatFetchedData(data: any[]) {
    let dataArray: {price: any; movieID: any; movieTitle: any; movieDuration: any; movieImage: any; movieStartDateTimeList: any[][]; movieTrailer: any; }[] = [];
  
    data.forEach((movieShow) => {
      const existingMovie = dataArray.find((newMovieShow) => newMovieShow.movieID === movieShow.movie.id);
  
      if (existingMovie) {
        existingMovie.movieStartDateTimeList.push([movieShow.startDateTime, movieShow.theater.id]);
      } else {
        dataArray.push({
          price: movieShow.price,
          movieID: movieShow.movie.id,
          movieTitle: movieShow.movie.title,
          movieDuration: movieShow.movie.runtime,
          movieImage: movieShow.movie.poster,
          movieStartDateTimeList: [[movieShow.startDateTime, movieShow.theater.id]],
          movieTrailer: movieShow.movie.trailer
        });
      }
    });
  
    return dataArray;
  }
  
  /*

  const fetchMovieData = async (startDate: Date, endDate: Date) => {
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
  
    try {
      const response = await fetch(`http://localhost:8080/movie-show/find-all-by-date-range/${start}/${end}`);
      const data = await response.json();
      return formatFetchedData(data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return [];
    };
  }; */


  useEffect(() => {
    
    const selectedDate = new Date();
    selectedDate.setDate(todaysDate.getDate() + selectedDateIndex);
    fetchMovieData(selectedDate).then((data) => {
      setMovieData(data);
    });
  }, [selectedDateIndex]);

/*

useEffect(() => {
  const initialStartDate = new Date(todaysDate);
  initialStartDate.setDate(todaysDate.getDate() + selectedDateIndex);
  const initialEndDate = new Date(initialStartDate);
  initialEndDate.setDate(initialStartDate.getDate() + numberOfDays - 1);

  fetchMovieData(initialStartDate, initialEndDate).then((data) => {
    setMovieData(data);
  });
}, [selectedDateIndex]);

*/

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
