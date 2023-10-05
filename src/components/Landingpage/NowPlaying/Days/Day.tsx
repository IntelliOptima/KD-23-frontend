import React from 'react'

interface DayProps {
    
    date: Date;
  }

const Day: React.FC<DayProps>= ({ date }) => {
    const today = new Date();
    const dayForShowing = new Date(date);
    
    
    console.log(dayForShowing.toLocaleString('en-UK', { weekday: 'long' }))
    debugger;

    return (
        
        
        
        <div className='flex flex-col items-center justify-center container h-14 w-60 p-4 bg-action-color'
        >
            <button className='text-white font-inter font-black absolute text-center bg-black w-56 h-12'>
                <p>
                    {(dayForShowing!==today? dayForShowing.toLocaleDateString('en-UK', {weekday: 'long' }) + ' ': "Today ")}
                       the 
                    {' ' + dayForShowing.getDate() + ' '} / {' ' + dayForShowing.getMonth()}

                </p>
            </button>
        </div>
    );
};

export default Day;