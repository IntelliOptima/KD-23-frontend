import React, { useState } from 'react';
import { Movie } from '@/components/MoviesContainer/MovieCard/MovieCard';

type Shows = {
    playTime: Date;
    runTime: number;
}

type WeekCalendarProps = {
    startTime: number;
    endTime: number;
    shows: Shows[];
}

const WeekCalendar = ({ startTime, endTime, shows }: WeekCalendarProps) => {
    const timeSlots = Array.from({ length: (endTime - startTime) * 4 }, (_, i) => ({
        hour: startTime + Math.floor(i / 4),
        quarter: i % 4
    }));


    const [days, setDays] = useState<Date[]>(() =>
        Array.from({ length: 7 }, (_, i) => new Date(Date.now() - (new Date().getDay() - 1) + i * 24 * 60 * 60 * 1000))
    );

    const goPrevWeek = () => changeWeek(-1);
    const goNextWeek = () => changeWeek(1);

    const changeWeek = (offset: number) => {
        const startDate = days[0].getTime() + offset * 7 * 24 * 60 * 60 * 1000;
        setDays(Array.from({ length: 7 }, (_, i) => new Date(startDate + i * 24 * 60 * 60 * 1000)));
    }

    const getDayNameAndDate = (date: Date) => {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3);
        const dayDate = date.toLocaleDateString();
        return `${dayName}- ${dayDate}`;
    }

    const getWeekRange = () => {
        const firstDay = days[0].toLocaleDateString();
        const lastDay = days[days.length - 1].toLocaleDateString();
        return `${firstDay} - ${lastDay}`;
    }

    const formatTimeSlot = (hour: number, quarter: number) => {
        const formattedHour = String(hour).padStart(2, '0');
        const minutes = String(quarter * 15).padStart(2, '0');
        return `${formattedHour}:${minutes}`;
    }


    return (
        <div className="flex flex-grow flex-col space-y-6 p-8 max-h-96 overflow-y-auto mt-12">
            <div className="flex justify-between items-center">
                <a href="#" onClick={goPrevWeek} className="text-xl">&lt;</a>
                <span className="text-2xl">{getWeekRange()}</span>
                <a href="#" onClick={goNextWeek} className="text-xl">&gt;</a>
            </div>

            <table className="w-full border-collapse">
                <thead className='sticky top-0 bg-white z-10 shadow-md'>
                    <tr>
                        <th className="border p-2 w-1/8 z-1"></th>
                        {days && days.map((day, index) => (
                            <th key={index} className="border p-2 w-1/8">{getDayNameAndDate(day)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((slot, index) => (
                        <tr key={index}>
                            <td className="border p-2">{formatTimeSlot(slot.hour, slot.quarter)}</td>
                            {days.map((day, dayIndex) => {
                                const currentSlotTime = slot.hour * 60 + slot.quarter * 15; // in minutes

                                const showStartingNow = shows.find(show => {
                                    const showDate = new Date(show.playTime);
                                    return day.getDay() === showDate.getDay() &&
                                        showDate.getHours() * 60 + showDate.getMinutes() === currentSlotTime;
                                });

                                if (showStartingNow) {
                                    const runtimeInQuarters = Math.ceil(showStartingNow.runTime / 15);
                                    return (
                                        <td key={dayIndex} className="border p-2 hover:cursor-pointer bg-red-400" rowSpan={runtimeInQuarters}></td>
                                    );
                                } else {
                                    // Check if this slot is within a show's duration
                                    const ongoingShow = shows.find(show => {
                                        const showDate = new Date(show.playTime);
                                        const showStartTime = showDate.getHours() * 60 + showDate.getMinutes();
                                        const showEndTime = showStartTime + show.runTime;
                                        return day.getDay() === showDate.getDay() &&
                                            currentSlotTime > showStartTime &&
                                            currentSlotTime < showEndTime;
                                    });

                                    // If we're in the duration of a show, skip rendering this slot
                                    if (ongoingShow) {
                                        return null;
                                    }

                                    return <td key={dayIndex} className="border p-2 hover:cursor-pointer hover:bg-slate-100"></td>;
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
