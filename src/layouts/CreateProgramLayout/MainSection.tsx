"use client";
import WeekCalendar from "@/components/CustomCalendar/WeekCalendar"
import { useState, ChangeEvent, useEffect } from 'react';
import { Movie } from "@/components/MoviesContainer/MovieCard/MovieCard";
import MovieSection from "./MovieSection";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import { Show } from "@/components/CustomCalendar/WeekCalendarFunctions";

const MainSection = () => {
    const {setSidebarOpen} = useAdminSidebar();
    const [showMovies, setShowMovies] = useState<boolean>(false);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [showTheater, setShowTheater] = useState<string>("");

    const shows: Show[] = [
        { playTime: new Date(2023, 9, 9, 12, 45), runTime: 45 },
        { playTime: new Date(2023, 9, 10, 13, 30), runTime: 60 },
        { playTime: new Date(2023, 9, 11, 14, 15), runTime: 60 },
        { playTime: new Date(2023, 9, 12, 10, 0), runTime: 45 },
        { playTime: new Date(2023, 9, 12, 11, 0), runTime: 90 },
        { playTime: new Date(2023, 9, 12, 15, 30), runTime: 60 },
        { playTime: new Date(2023, 9, 13, 10, 15), runTime: 30 },
        { playTime: new Date(2023, 9, 13, 11, 15), runTime: 60 },
        { playTime: new Date(2023, 9, 13, 16, 45), runTime: 90 },
        { playTime: new Date(2023, 9, 14, 10, 0), runTime: 30 },
        { playTime: new Date(2023, 9, 14, 12, 0), runTime: 45 },
        { playTime: new Date(2023, 9, 14, 14, 15), runTime: 60 },
        { playTime: new Date(2023, 9, 15, 13, 0), runTime: 45 },
        { playTime: new Date(2023, 9, 15, 15, 15), runTime: 60 },
        { playTime: new Date(2023, 9, 16, 11, 30), runTime: 90 },
        { playTime: new Date(2023, 9, 16, 14, 0), runTime: 45 },
        { playTime: new Date(2023, 9, 16, 16, 0), runTime: 30 },
        { playTime: new Date(2023, 9, 17, 10, 45), runTime: 90 },
        { playTime: new Date(2023, 9, 17, 14, 0), runTime: 45 },
        { playTime: new Date(2023, 9, 17, 15, 30), runTime: 60 }
    ];
    


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target as HTMLInputElement;
        setShowTheater(target.value);
    }

    useEffect(() => {
        setSidebarOpen(!showMovies);
    }, [setSidebarOpen, showMovies])


    return (
        <div className="overflow-x-hidden relative h-screen hide-scrollbar">
            <div className="flex flex-row">
                <div className={`relative z-10 transition-all duration-300 ease-in-out ${showMovies ? 'w-1/2' : 'w-full'} flex flex-col justify-center items-center`}>
                    <div className="mb-4 flex align-baseline">
                        <label htmlFor="theaterSelector" className="">Select a theater</label>
                        <select className="border-2 border-gray-500 rounded-md ml-5  p-1 hover:cursor-pointer"
                            onChange={handleChange}
                            value={showTheater}
                        >
                            <option value="Theater 1">Theater 1</option>
                            <option value="Theater 2">Theater 2</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                    <WeekCalendar shows={shows} movie={movie} />
                    <button className="btn-primary mt-4" type="button" onClick={() => setShowMovies(cur => !cur)}>
                        Choose movie
                    </button>
                    </div>
                </div>

                {/* MovieSection container */}
                <div className={`absolute top-0 right-0 p-4 w-1/2 h-5/6 transition-transform duration-300 ease-in-out ${showMovies ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto mt-12 hide-scrollbar`}>
                    <MovieSection setMovie={setMovie} />
                </div>

            </div>
        </div>
    )

}

export default MainSection
