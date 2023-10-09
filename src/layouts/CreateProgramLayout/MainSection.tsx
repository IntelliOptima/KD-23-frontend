"use client";
import WeekCalendar from "@/components/CustomCalendar/WeekCalendar"
import { useState } from 'react';
import MoviesContainer from "@/components/MoviesContainer/MovieContainer";
import Input from "@/components/CustomInputs/Input";
import MovieSection from "./MovieSection";

const MainSection = () => {
    const [showMovies, setShowMovies] = useState<boolean>(false);


    return (
        <>
        <button className="btn-primary" type="button" onClick={() => setShowMovies(cur => !cur)} >Choose movie</button>
        <div className="flex">
        <WeekCalendar startTime={8} endTime={20} />
        {showMovies && <MovieSection/>}
        </div>
        </>
    )
}

export default MainSection
