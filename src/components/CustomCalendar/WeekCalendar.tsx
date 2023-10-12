import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import WeekCalendarFunctions from './WeekCalendarFunctions';
import  { Movie, Show, Theater } from '../../Types/Types'
import { DeleteShowConfirmAlert, DeleteShowSuccessAlert } from '../SweetAlert2/CreateProgramAlerts/CreateProgramCRUDAlerts';

// Se nu bare her! 

type WeekCalendarProps = {
    toggleRefetch: boolean;
    movie: Movie | null;
    chosenShowsPlayDateTime: Show[];
    setChosenShowsPlayDateTime: Dispatch<SetStateAction<Show[]>>;
    theater: Theater;
    showPrice: number;
    programList: Show[];
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const WeekCalendar = ({ movie, toggleRefetch, chosenShowsPlayDateTime, setChosenShowsPlayDateTime, theater, showPrice, programList, setIsLoading }: WeekCalendarProps) => {
    const [fetchedShows, setFetchedShows] = React.useState<Show[]>([]);   

    const {
        goNextWeek,goPrevWeek,
        days, timeSlots,
        getWeekRange, getDayNameAndDate,
        formatTimeSlot, isShowStartingAtSlot,
        isSlotDuringShow, isAnyShowDuringTimeRange,
    } = WeekCalendarFunctions(fetchedShows);

    const handleClickOnChosenDateTime = (iteratedDateTime: Date) => {
        setChosenShowsPlayDateTime((cur) =>
            cur.filter(show =>
                show.startDateTime.getTime() !== iteratedDateTime.getTime()))
    }


    //Fetching all created shows from backend for given week
    useEffect(() => {
        setFetchedShows([]);

        async function fetchShows() {
            // Production: 
            try {      
                setIsLoading(true);          
                const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIESHOW_API}/theater=/${theater.id}/startDate=/${days[0].toISOString()}/endDate=/${days[days.length - 1].toISOString()}/cinema=/${1}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    setIsLoading(false);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();  
                setIsLoading(false);              
                setFetchedShows(data)
            } catch (error: any) {
                setIsLoading(false);
                console.error("There was a problem with the fetch operation:", error.message);
            }
        };
        fetchShows();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theater, days, toggleRefetch]);
    

    useEffect(() => {
        setChosenShowsPlayDateTime([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theater]);
    

    const handleClickDeleteMovieShow = async (showToDelete: Show) => {
        DeleteShowConfirmAlert().then( async (result) => {
            const id = showToDelete.id;
            
            if (result.isConfirmed) {
                        try {         
                            setIsLoading(true);                   
                            const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIESHOW_API}/${id}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                credentials: "include",                                                                
                            });
            
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                                                                         
                        } catch (error: any) {
                            console.error("There was a problem with the fetch operation:", error.message);
                        }                        
                        setFetchedShows(cur => cur.filter(show => show.id !== id));
                        setIsLoading(false);
                        DeleteShowSuccessAlert()
                    };            
          })
    }

    return (     
        <div className="flex flex-grow flex-col space-y-8 p-8 h-[65vh] overflow-auto mt-12 hide-scrollbar">
            <div className="flex justify-between items-center">
                <button onClick={goPrevWeek} className="text-xl">&lt;</button>
                <span className="text-2xl">{getWeekRange()}</span>
                <button onClick={goNextWeek} className="text-xl">&gt;</button>
            </div>

            <table className="w-full border-collapse">
                <thead className='sticky top-0 bg-white z-10 shadow-md'>
                    <tr>
                        <th className="border p-2 w-1/8 z-1"></th>
                        {days.map((day, index) => (
                            <th key={index} className="border p-2 w-1/8">{getDayNameAndDate(day)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((slot, index) => (
                        <tr key={index}>
                            <td className="border p-2">{formatTimeSlot(slot.hour, slot.quarter)}</td>
                            {days.map((day, dayIndex) => {
                                const currentSlotTime = slot.hour * 60 + slot.quarter * 15;
                                const iteratedDateTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), slot.hour, slot.quarter * 15);

                                // 1. Check if there's a program show starting now.
                                const programShowStarting = programList.find(programShow =>
                                    isShowStartingAtSlot(programShow, day, currentSlotTime));

                                if (programShowStarting) {
                                    const runtimeInQuarters = Math.ceil(programShowStarting.movie.runtime / 15);
                                    return (
                                        <td key={dayIndex} className="max-w-0 border p-2 hover:cursor-pointer bg-emerald-400 hover:bg-emerald-300" rowSpan={runtimeInQuarters}>
                                            {programShowStarting.movie.title}
                                        </td>
                                    );
                                }

                                // 2. Check if there's an ongoing program show.
                                const ongoingProgramShow = programList.find(programShow =>
                                    isSlotDuringShow(programShow, day, currentSlotTime));

                                if (ongoingProgramShow) {
                                    return null; // Skip this slot since a program show is ongoing
                                }

                                // 3. Check if there's a fetched show starting now.
                                const showStartingNow = fetchedShows.find(show =>
                                    isShowStartingAtSlot(show, day, currentSlotTime));

                                if (showStartingNow) {
                                    const runtimeInQuarters = Math.ceil(showStartingNow.movie.runtime / 15);
                                    return (
                                        <td key={dayIndex} onClick={() => handleClickDeleteMovieShow(showStartingNow)} 
                                        className="max-w-0 border p-2 hover:cursor-pointer bg-red-400 hover:bg-red-300" rowSpan={runtimeInQuarters}>
                                            {showStartingNow.movie.title}
                                        </td>
                                    );
                                }

                                // 4. Check if there's a chosen show starting now.
                                const chosenShowStarting = chosenShowsPlayDateTime.find(chosenShow =>
                                    isShowStartingAtSlot(chosenShow, day, currentSlotTime));

                                if (chosenShowStarting) {
                                    const runtimeInQuarters = Math.ceil(chosenShowStarting.movie.runtime / 15);
                                    return (
                                        <td key={dayIndex} onClick={() => handleClickOnChosenDateTime(chosenShowStarting.startDateTime)}
                                            className="max-w-0 border p-2 hover:cursor-pointer bg-blue-300 hover:bg-blue-400" rowSpan={runtimeInQuarters}>
                                            {chosenShowStarting.movie.title}
                                        </td>
                                    );
                                }

                                // 5. Check if there's any ongoing show or chosen show.
                                const ongoingShow = fetchedShows.find(show => isSlotDuringShow(show, day, currentSlotTime));
                                const ongoingChosenShow = chosenShowsPlayDateTime.find(chosenShow =>
                                    isSlotDuringShow(chosenShow, day, currentSlotTime));

                                if (ongoingShow || ongoingChosenShow) {
                                    return null; // Skip this slot since a show is ongoing
                                }

                                // 6. If none of the above, render cell based on the possibility to start a movie.
                                const movieDuration = movie?.runtime || 0;
                                const isPossibleToStartMovie = !isAnyShowDuringTimeRange(day, currentSlotTime, currentSlotTime + movieDuration, fetchedShows);
                                const isPossibleToStartMovieByChosenDates = !isAnyShowDuringTimeRange(day, currentSlotTime, currentSlotTime + movieDuration, chosenShowsPlayDateTime);
                                const isPossibleToStartMovieConsideringProgram = !isAnyShowDuringTimeRange(day, currentSlotTime, currentSlotTime + movieDuration, programList);
                                return (
                                    <td
                                        key={dayIndex}
                                        onClick={() => {
                                            if (movie && isPossibleToStartMovie && isPossibleToStartMovieByChosenDates && isPossibleToStartMovieConsideringProgram) {
                                                setChosenShowsPlayDateTime(cur => [...cur, {
                                                    startDateTime: iteratedDateTime,
                                                    movie: { ...movie },
                                                    theater: theater,
                                                    price: showPrice
                                                }]);
                                            }
                                        }}
                                        className={`border p-2 hover:cursor-pointer ${isPossibleToStartMovie && isPossibleToStartMovieByChosenDates && isPossibleToStartMovieConsideringProgram && movie ? 'bg-green-100 hover:bg-green-200' : 'bg-slate-300 hover:bg-slate-400'}`}
                                    ></td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WeekCalendar;

