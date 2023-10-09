"use client";
import WeekCalendar from "@/components/CustomCalendar/WeekCalendar"
import { useState, ChangeEvent } from 'react';
import { Movie } from "@/components/MoviesContainer/MovieCard/MovieCard";
import MovieSection from "./MovieSection";

const MainSection = () => {
    const [showMovies, setShowMovies] = useState<boolean>(false);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [displayDateTimes, setDisplayDateTime] = useState<Date[]>([]);
    const [showTheater, setShowTheater] = useState<string>("");

    const curDate = new Date(2023, 9, 9, 12, 45); 
    const anotherDate = new Date(2023, 9, 14, 12, 30);    
    const shows = [{playTime: curDate, runTime: 45}, 
        {playTime: anotherDate, runTime: 60}, {playTime: new Date(2023, 9, 12, 12.45), runTime: 60}];


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target as HTMLInputElement;
        setShowTheater(target.value);
    }
    

    return (
        <>
            <div className="flex flex-row justify-center">
                <div className="flex flex-col items-center flex-grow">
                    <div>
                        <label htmlFor="stringSelector">Select a theater</label>
                        <select className="border-2 border-gray-500 rounded-md p-1 ml-5 hover:cursor-pointer"
                            onChange={handleChange}
                            value={showTheater}
                        >
                            <option value="Theater 1">Theater 1</option>
                            <option value="Theater 2">Theater 2</option>
                        </select>
                    </div>
                    <WeekCalendar shows={shows} startTime={12} endTime={23} />
                    <button className="btn-primary" type="button" onClick={() => setShowMovies(cur => !cur)} >Choose movie</button>
                </div>
                <div className={` flex-grow p-4 transition-transform duration-300 ease-in-out transform ${showMovies ? '-translate-x-0' : 'translate-x-full'}`}>
                    <MovieSection setMovie={setMovie} />
                </div>
            </div>
        </>
    )
}

export default MainSection
