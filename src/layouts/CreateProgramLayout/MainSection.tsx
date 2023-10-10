"use client";
import WeekCalendar from "@/components/CustomCalendar/WeekCalendar"
import { useState, ChangeEvent, useEffect } from 'react';
import type { Movie } from "@/components/MoviesContainer/MovieCard/MovieCard";
import MovieSection from "./MovieSection";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import type { Show, Theater } from "@/components/CustomCalendar/WeekCalendarFunctions";

const MainSection = () => {
    const {setSidebarOpen} = useAdminSidebar();
    const [slideInMoviesContainer, setSlideInMoviesContainer] = useState<boolean>(false);
    const [fetchedTheaters, setFetchedTheaters] = useState<Theater[]>([]);
        
    //those variables are for the program admin is creating
    const [chosenTheater, setChosenTheater] = useState<Theater>();
    const [chosenMovie, setChosenMovie] = useState<Movie | null>(null);
    const [chosenShowsPlayDateTime, setChosenShowsPlayDateTime] = useState<Show[]>([]);
    const [showPrice, setShowPrice] = useState(0);

    useEffect(() => {
        async function fetchTheater(cinemaID: number) {

            try {
                const response = await fetch(`https://kinoxpbackend.azurewebsites.net/theaters/id=/${cinemaID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setFetchedTheaters(data);
            } catch (error: any) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        }
        fetchTheater(1);
    }, []);
    

    console.log(chosenTheater?.id)

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target as HTMLInputElement;
        setChosenTheater(fetchedTheaters.find(theater => theater.id === parseInt(target.value))!);
    }

    useEffect(()=> {
        setChosenShowsPlayDateTime([]);
    }, [chosenMovie])

    useEffect(() => {
        setSidebarOpen(!slideInMoviesContainer);
    }, [setSidebarOpen, slideInMoviesContainer])


    return (
        <div className="overflow-x-hidden relative h-screen hide-scrollbar">
            <div className="flex flex-row">
                <div className={`relative z-10 transition-all duration-300 ease-in-out ${slideInMoviesContainer ? 'w-1/2' : 'w-full'} flex flex-col justify-center items-center`}>
                    <div className="mb-4 flex align-baseline">
                        <label htmlFor="theaterSelector" className="">Select a theater</label>
                        <select className="border-2 border-gray-500 rounded-md ml-5  p-1 hover:cursor-pointer"
                            onChange={handleChange}
                            value={chosenTheater?.id || ""}
                        >
                            <option value="" disabled hidden>Select a theater</option>
                            {fetchedTheaters.map((theater) => (
                                <option key={theater.id} value={theater.id}>{theater.name}</option>
                            ))}                      
                        
                        </select>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                    <WeekCalendar movie={chosenMovie} chosenShowsPlayDateTime={chosenShowsPlayDateTime} 
                    setChosenShowsPlayDateTime={setChosenShowsPlayDateTime} theater={chosenTheater!} showPrice={showPrice} />
                    <button className="btn-primary mt-4" type="button" onClick={() => setSlideInMoviesContainer(cur => !cur)}>
                        Choose movie
                    </button>
                    </div>
                </div>

                {/* MovieSection container */}
                <div className={`absolute top-0 right-0 p-4 w-1/2 h-5/6 transition-transform duration-300 ease-in-out ${slideInMoviesContainer ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto mt-12 hide-scrollbar`}>
                    <MovieSection setMovie={setChosenMovie} />
                </div>

            </div>
        </div>
    )

}

export default MainSection
