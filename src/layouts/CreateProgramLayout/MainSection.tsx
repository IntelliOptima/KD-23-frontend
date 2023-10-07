"use client";
import WeekCalendar from "@/components/CustomCalendar/WeekCalendar"
import { useState } from 'react';
import MoviesContainer from "@/components/MoviesContainer/MovieContainer";

const MainSection = () => {
    const [page, setPage] = useState(0);


    return (
        <>
            <div className=" flex justify-between">
                <button disabled={page == 0} onClick={() => setPage(prev => prev - 1)}>Previous</button>
                <button onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>
            <MoviesContainer page={page} />
            <div className=" flex justify-between">
                <button disabled={page == 0} onClick={() => setPage(prev => prev - 1)}>Previous</button>
                <button onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>


            <WeekCalendar startTime={8} endTime={20} />
        </>
    )
}

export default MainSection
