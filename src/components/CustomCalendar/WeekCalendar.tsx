import React from 'react';
import { Movie } from '@/components/MoviesContainer/MovieCard/MovieCard';
import WeekCalendarFunctions from './WeekCalendarFunctions';

type Shows = {
    playTime: Date;   // Change this from string to Date
    runTime: number;
}

type WeekCalendarProps = {
    shows: Shows[];
    movie: Movie | null;
}

const WeekCalendar = ({ shows, movie }: WeekCalendarProps) => {
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
        canScheduleMovie,
        isAnyShowDuringTimeRange,
    } = WeekCalendarFunctions(shows);

    const { canPlay, startingSlot, endingSlot } = canScheduleMovie(movie);

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

                                const showStartingNow = shows.find(show => isShowStartingAtSlot(show, day, currentSlotTime));
                                if (showStartingNow) {
                                    const runtimeInQuarters = Math.ceil(showStartingNow.runTime / 15);
                                    return (
                                        <td key={dayIndex} className="border p-2 hover:cursor-pointer bg-red-400 hover:bg-red-300" rowSpan={runtimeInQuarters}></td>
                                    );
                                } else {
                                    const ongoingShow = shows.find(show => isSlotDuringShow(show, day, currentSlotTime));
                                    if (ongoingShow) {
                                        return null; // Skip this slot since a show is ongoing
                                    }

                                    const movieDuration = movie?.runtime || 0;
                                    const isPossibleToStartMovie = !isAnyShowDuringTimeRange(day, currentSlotTime, currentSlotTime + movieDuration, shows);

                                    return (
                                        <td
                                            key={dayIndex}
                                            className={`border p-2 hover:cursor-pointer 
                                            ${isPossibleToStartMovie && movie ? 'bg-green-400 hover:bg-green-500' : 'hover:bg-slate-100'}`}
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
