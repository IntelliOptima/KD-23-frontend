import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Movie } from '@/components/MoviesContainer/MovieCard/MovieCard';
import WeekCalendarFunctions, { Show, Theater } from './WeekCalendarFunctions';

type WeekCalendarProps = {    
    movie: Movie | null;
    chosenShowsPlayDateTime: Show[];
    setChosenShowsPlayDateTime: Dispatch<SetStateAction<Show[]>>;
    theater: Theater;
    showPrice: number;
}

const WeekCalendar = ({ movie, chosenShowsPlayDateTime, setChosenShowsPlayDateTime, theater, showPrice }: WeekCalendarProps) => {
    const [fetchedShows, setFetchedShows] = React.useState<Show[]>([]);
    const {
        goNextWeek,
        goPrevWeek,
        days,
        timeSlots,
        getWeekRange,
        getDayNameAndDate,
        formatTimeSlot,
        isShowStartingAtSlot,        
        isSlotDuringShow,
        isAnyShowDuringTimeRange,
    } = WeekCalendarFunctions(fetchedShows);

    const handleClickOnChosenDateTime = (iteratedDateTime: Date) => {
        setChosenShowsPlayDateTime((cur) =>
        cur.filter(show =>                                                     
            show.startDateTime.getTime() !== iteratedDateTime.getTime()))
    }


    useEffect(() => {
        async function fetchShows() {

            try {
                const response = await fetch(`https://kinoxpbackend.azurewebsites.net/shows/theaterID=/${theater.id}/startDate=/${days[0].getDate}/endDate=/${days[days.length - 1].getDate}/cinemaID=/${1}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setFetchedShows(data)
            } catch (error: any) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        };
        fetchShows();
    }, [theater, days]);

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
                                const currentSlotTime = slot.hour * 60 + slot.quarter * 15; // Convert to minutes

                                const showStartingNow = fetchedShows.find(show => isShowStartingAtSlot(show, day, currentSlotTime));
                                const chosenShowStarting = chosenShowsPlayDateTime.find(chosenShow => 
                                    isShowStartingAtSlot(chosenShow, day, currentSlotTime));

                                if (showStartingNow) {
                                    const runtimeInQuarters = Math.ceil(showStartingNow.movie.runtime / 15);
                                    return (
                                        <td key={dayIndex} className="border p-2 hover:cursor-pointer bg-red-400 hover:bg-red-300" rowSpan={runtimeInQuarters}></td>
                                    );
                                } else if (chosenShowStarting && movie != null) {
                                    const runtimeInQuarters = Math.ceil(movie.runtime / 15);
                                    return (
                                        <td key={dayIndex} onClick={() => handleClickOnChosenDateTime(new Date(day.getFullYear(), day.getMonth(), day.getDate(), slot.hour, slot.quarter * 15))} 
                                        className="border p-2 hover:cursor-pointer bg-blue-300 hover:bg-blue-400" rowSpan={runtimeInQuarters}></td>
                                    );
                                } else {
                                    const ongoingShow = fetchedShows.find(show => isSlotDuringShow(show, day, currentSlotTime));
                                    
                                    const onGoingChosenShow = chosenShowsPlayDateTime.find(chosenShow => isSlotDuringShow(chosenShow, day, currentSlotTime))
                                
                                    if (ongoingShow || onGoingChosenShow) {
                                        return null; // Skip this slot since a show is ongoing
                                    }

                                    const movieDuration = movie?.runtime || 0;
                                    const isPossibleToStartMovie = !isAnyShowDuringTimeRange(day, currentSlotTime, currentSlotTime + movieDuration, fetchedShows);   
                                    const isPossibleToStartMovieByChosenDates = !isAnyShowDuringTimeRange(day, currentSlotTime, currentSlotTime + movieDuration, chosenShowsPlayDateTime);                                  

                                    return (
                                        <td
                                            key={dayIndex}
                                            onClick={() => {
                                                if (movie != null && isPossibleToStartMovie && isPossibleToStartMovieByChosenDates)
                                                setChosenShowsPlayDateTime(cur => [...cur, {startDateTime: new Date(day.getFullYear(), day.getMonth(), day.getDate(),
                                                    slot.hour, slot.quarter * 15), movie: movie, theater: theater, price: showPrice}])
                                            }}
                                            className={`border p-2 hover:cursor-pointer 
                                            ${isPossibleToStartMovie && isPossibleToStartMovieByChosenDates && movie ? 'bg-green-100 hover:bg-green-200' : 'bg-slate-300 hover:bg-slate-400'}`}
                                        ></td>
                                    );
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WeekCalendar;

