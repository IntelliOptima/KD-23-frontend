import React, { useState } from 'react';

type WeekCalendarProps = {
    startTime: number;
    endTime: number;
}

const WeekCalendar = ({ startTime, endTime }: WeekCalendarProps) => {
    const timeSlots = Array.from({ length: endTime - startTime }, (_, i) => startTime + i);


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

    return (
        <div className="flex flex-col space-y-6 p-8">
            <div className="flex justify-between items-center">
                <a href="#" onClick={goPrevWeek} className="text-xl">&lt;</a>
                <span className="text-2xl">{getWeekRange()}</span>
                <a href="#" onClick={goNextWeek} className="text-xl">&gt;</a>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2 w-1/8">Tid</th>
                        {days && days.map((day, index) => (
                            <th key={index} className="border p-2 w-1/8">{getDayNameAndDate(day)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map(slot => (
                        <tr key={slot}>
                            <td className="border p-2">{String(slot).padStart(2, '0')}:00</td>
                            {days && days.map((_, index) => (
                                <td key={index} className="border p-2"></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WeekCalendar;
