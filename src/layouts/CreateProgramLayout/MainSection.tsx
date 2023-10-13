"use client";
import WeekCalendar from "@/components/CustomCalendar/WeekCalendar"
import { useState, ChangeEvent, useEffect, Dispatch, SetStateAction } from 'react';
import type { Movie } from "@/Types/Types";
import MovieSection from "./MovieSection";
import { useAdminSidebar } from "@/contexts/AdminSidebarContext";
import type { Show, Theater } from "@/Types/Types";
import GeneralButton from "@/components/Buttons/GeneralButton";
import { MissingTheaterOrPriceAlert, MissingTheaterPriceAlert } from "@/components/SweetAlert2/CreateProgramAlerts/MissingTheaterPriceAlert";
import { CreateProgramGoneWrongAlert, CreateProgramSuccess } from "@/components/SweetAlert2/CreateProgramAlerts/CreateProgramCRUDAlerts";
import { CirclesWithBar } from "react-loader-spinner";

const MainSection = () => {
    const {setSidebarOpen} = useAdminSidebar();
    const [slideInMoviesContainer, setSlideInMoviesContainer] = useState<boolean>(false);
    const [fetchedTheaters, setFetchedTheaters] = useState<Theater[]>([]);

    //those variables are for the new program admin is creating
    const [chosenTheater, setChosenTheater] = useState<Theater>();
    const [chosenMovie, setChosenMovie] = useState<Movie | null>(null);
    const [chosenShowsPlayDateTime, setChosenShowsPlayDateTime] = useState<Show[]>([]);
    const [programList, setProgramList] = useState<Show[]>([]); //this is the list of shows that will be sent to the backend to create a program
    const [showPrice, setShowPrice] = useState(0);
    const [toggleRefetch, setToggleRefetch] = useState<boolean>(false);
    const [IsLoading, setIsLoading] = useState(false);

    const handleAddToProgram = (
        chosenShowsPlayDateTime: Show[],
        setProgramList: Dispatch<SetStateAction<Show[]>>,
        setChosenShowsPlayDateTime: Dispatch<SetStateAction<Show[]>>
    ) => {
        setProgramList((prev) => {
            const uniqueShows = chosenShowsPlayDateTime.filter(newShow => 
                !prev.includes(newShow)
            );
    
            return [...prev, ...uniqueShows];
        });
        setChosenShowsPlayDateTime([]);  // Clear the chosenShowsPlayDateTime array
    };
    
    
    useEffect(() => {
        async function fetchTheater(cinemaID: number) {

            try {                
                const response = await fetch(`${process.env.NEXT_PUBLIC_THEATER_API}/cinema=/${cinemaID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
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
        fetchTheater(1); //magicnumber: 1 is the cinema ID - only one cinema for this task
    }, []);
    
    const handleClickCreateProgram = async () => { 
        const programStartDate = programList.sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime())[0].startDateTime;
        const programEndDate = programList.sort((a, b) => b.startDateTime.getTime() - a.startDateTime.getTime())[0].startDateTime;
       
        const programListWithDatesAsIsoString = programList.map(show => {           
            return {...show, startDateTime: show.startDateTime.toISOString()}
        })

        const program = {
            startDate: programStartDate.toISOString(), endDate: programEndDate.toISOString(), 
            cinemaId: 1, movieShows: programListWithDatesAsIsoString
        };        

        const objectAsJsonString = JSON.stringify(program);
    
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_PROGRAM_API}`, {
                method: "POST",
                headers: {
                "content-type": "application/json",
              },          
              body: objectAsJsonString,
              credentials: "include",
            });
        
            if (!response.ok) {
                setIsLoading(false);
                const errorMessage = await response.text();              
                CreateProgramGoneWrongAlert();
                throw new Error(errorMessage);
            } else {
                setIsLoading(false);
                CreateProgramSuccess();                
                setChosenShowsPlayDateTime([]);
                setProgramList([]);
                setToggleRefetch(cur => !cur);                            
            }
        } catch (error: any) {
            setIsLoading(false);
            CreateProgramGoneWrongAlert();
        }
      };


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = event.target as HTMLInputElement;
        setChosenTheater(fetchedTheaters.find(theater => theater.id === parseInt(target.value))!);
    }


    const clickChooseMovie = () => {
        if (chosenTheater === undefined && showPrice === 0) {  
           MissingTheaterPriceAlert();
        } else if (chosenTheater === undefined || showPrice === 0) {
            MissingTheaterOrPriceAlert(chosenTheater)
        } else setSlideInMoviesContainer(cur => !cur)
    }

    useEffect(() => {
        setSidebarOpen(!slideInMoviesContainer);
    }, [setSidebarOpen, slideInMoviesContainer])


    return (
        <div>
            
            {IsLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="flex justify-center">
                    <CirclesWithBar
                        height="100"
                        width="100"
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={IsLoading}
                        outerCircleColor="orange"
                        innerCircleColor="red"
                        barColor=""
                        ariaLabel="circles-with-bar-loading"
                    />
                </div>
            </div>
        )}

             <div className="overflow-x-hidden relative h-screen hide-scrollbar">
            <div className="flex flex-row">
                <div className={`relative z-10 transition-all duration-300 ease-in-out ${slideInMoviesContainer ? 'w-1/2' : 'w-full'} flex flex-col justify-center items-center`}>
                    <div className="mb-4 flex align-baseline mt-3">
                        <label htmlFor="theaterSelector" className="flex self-end">Select a theater</label>
                        <select className="border-2 border-gray-500 rounded-md ml-5  p-1 hover:cursor-pointer"
                            onChange={handleChange}
                            value={chosenTheater?.id || ""}
                        >
                            <option value="" disabled hidden>Select a theater</option>
                            {fetchedTheaters.map((theater) => (
                                <option key={theater.id} value={theater.id}>{theater.name}</option>
                            ))}                      
                        
                        </select>
                        <label htmlFor="movieShowPrice" className="ml-10 flex self-end">Select a price</label>
                        <select className="border-2 border-gray-500 rounded-md ml-5  p-1 hover:cursor-pointer"
                            onChange={(e) => setShowPrice(parseInt(e.target.value))}
                            value={showPrice || 0}
                        >   
                            <option value={0} disabled hidden>Select a price</option>
                            {[89, 100, 125, 150, 170, 199, 240].map((price) => (
                                <option key={price} value={price}>{price}</option>
                            ))}
                        </select>
                        <button className="btn-primary ml-24" type="button" onClick={() => clickChooseMovie()}>
                            Choose movie
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                    <WeekCalendar movie={chosenMovie} chosenShowsPlayDateTime={chosenShowsPlayDateTime} programList={programList}
                    setChosenShowsPlayDateTime={setChosenShowsPlayDateTime} theater={chosenTheater!} showPrice={showPrice}
                    toggleRefetch={toggleRefetch} setIsLoading={setIsLoading} />
                    <GeneralButton type="button" width="auto" disabled={false} text="Add to program" color="blue"
                    onClick={() => handleAddToProgram(chosenShowsPlayDateTime, setProgramList, setChosenShowsPlayDateTime)} />

                    <GeneralButton type="button" width="auto" disabled={false} text="Create and save new program" color={programList.length === 0 ? "red" : "green"}
                    onClick={() => handleClickCreateProgram()} />
                    </div>
                </div>

                {/* MovieSection container */}
                <div className={`absolute top-0 right-0 p-4 w-1/2 h-5/6 transition-transform duration-300 ease-in-out ${slideInMoviesContainer ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto mt-12 hide-scrollbar`}>
                    <MovieSection setMovie={setChosenMovie} />
                </div>

            </div>
        </div>
        </div>
    )

}

export default MainSection
