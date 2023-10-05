import React from 'react';
import DayRow from './DayRow';

const todaysDate = new Date();


const DayTable = () => {
    return (
        <>
        <DayRow startDay={0} endDay={4} date={todaysDate} numberOfDays={4} />
        <DayRow startDay={4} endDay={8} date={todaysDate} numberOfDays={4} />
        </>
    );


};

export default DayTable;