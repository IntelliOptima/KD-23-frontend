import React from 'react';
import Day from '@components/Landingpage/NowPlaying/Days/Day';
import DayRow from './DayRow';

const todaysDate = new Date();


const DayTable = () => {
    return (

        <DayRow startDay={0} endDay={3} date={todaysDate} numberOfDays={4}></DayRow>


    );


};

export default DayTable;