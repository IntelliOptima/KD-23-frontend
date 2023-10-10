import { useState } from 'react';

    type TimeSlot = {
        hour: number;
        quarter: number;
    }

    export type Show = {
        playTime: Date;
        runTime: number;
    }

    const generateTimeSlots = (start: number, end: number): TimeSlot[] => {
        const slots: TimeSlot[] = [];
        for (let i = 0; i < (end - start) * 4; i++) {
            const hour = start + Math.floor(i / 4);
            const quarter = i % 4;
            slots.push({ hour, quarter });
        }
        return slots;
    };

    const startTime = 9;
    const endTime = 22;
    const timeSlots = generateTimeSlots(startTime, endTime);

    const generateCurrentWeek = (): Date[] => {
        const today = new Date();
        const week: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(today);
            day.setDate(today.getDate() - today.getDay() + 1 + i);
            week.push(day);
        }
        return week;
    };


    const WeekCalendarFunctions = (shows: Show[]) => {
        const [days, setDays] = useState<Date[]>(generateCurrentWeek());

        const changeWeek = (offset: number): void => {
            const newStartDate = new Date(days[0]);
            newStartDate.setDate(days[0].getDate() + offset * 7);
            const newWeek = generateWeekFromDate(newStartDate);
            setDays(newWeek);
        };

        const generateWeekFromDate = (startDate: Date): Date[] => {
            const week: Date[] = [];
            for (let i = 0; i < 7; i++) {
                const day = new Date(startDate);
                day.setDate(startDate.getDate() + i);
                week.push(day);
            }
            return week;
        };

        const goPrevWeek = (): void => {
            changeWeek(-1);
        };

        const goNextWeek = (): void => {
            changeWeek(1);
        };

        const getDayNameAndDate = (date: Date): string => {
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3);
            const dayDate = date.toLocaleDateString();
            return `${dayName} - ${dayDate}`;
        };

        const getWeekRange = (): string => {
            const firstDay = days[0].toLocaleDateString();
            const lastDay = days[days.length - 1].toLocaleDateString();
            return `${firstDay} - ${lastDay}`;
        };

        const formatTimeSlot = (hour: number, quarter: number): string => {
            const formattedHour = String(hour).padStart(2, '0');
            const minutes = String(quarter * 15).padStart(2, '0');
            return `${formattedHour}:${minutes}`;
        };

        const isShowStartingAtSlot = (show: Show, day: Date, slotTime: number): boolean => {
            const showDate = new Date(show.playTime);
            return (
                day.getDate() === showDate.getDate() && 
                day.getMonth() === showDate.getMonth() &&
                day.getFullYear() === showDate.getFullYear() &&
                showDate.getHours() * 60 + showDate.getMinutes() === slotTime
            );
        };
        

        const isSlotDuringShow = (show: Show, day: Date, slotTime: number): boolean => {
            const showDate = new Date(show.playTime);
            const showStartTime = showDate.getHours() * 60 + showDate.getMinutes();
            const showEndTime = showStartTime + show.runTime;
            return (
                day.getDate() === showDate.getDate() && 
                day.getMonth() === showDate.getMonth() &&
                day.getFullYear() === showDate.getFullYear() &&
                slotTime > showStartTime && slotTime < showEndTime
            );
        };


        const doesOverlap = (start1: number, end1: number, start2: number, end2: number) => {
            return start1 < end2 && start2 < end1;
        };

        const isAnyShowDuringTimeRange = (day: Date, startTime: number, endTime: number, shows: Show[]): boolean => {
            const showsOnDay = shows.filter(show => (new Date(show.playTime)).toDateString() === day.toDateString());
        
            return showsOnDay.some(show => {
                const showStartTime = new Date(show.playTime).getHours() * 60 + new Date(show.playTime).getMinutes();
                const showEndTime = showStartTime + show.runTime;
                return doesOverlap(startTime, endTime, showStartTime, showEndTime);
            });
        };

        return {
            timeSlots,
            days,
            goPrevWeek,
            goNextWeek,
            getDayNameAndDate,
            getWeekRange,
            formatTimeSlot,
            isShowStartingAtSlot,
            isSlotDuringShow,
            isAnyShowDuringTimeRange,
        };
    };

    export default WeekCalendarFunctions;
