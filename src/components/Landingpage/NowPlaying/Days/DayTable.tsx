import React from 'react';
import DayRow from './DayRow';
import MoviesPlaying from '../Movies/MoviesPlaying';

const todaysDate = new Date();


const DayTable = () => {
    return (
        <><div className='mt-20'>
            <DayRow startDay={0} endDay={4} date={todaysDate} numberOfDays={4} />
            <DayRow startDay={4} endDay={8} date={todaysDate} numberOfDays={4} />
        </div><div className='mt-20'>
                <MoviesPlaying />
            </div></>

    );


};

export default DayTable;