import Image from 'next/image';
import React from 'react';
import { FC } from 'react';

interface MovieProp {
    movieID: number;
    movieTitle: string;
    duration: number;
    movieImage: string;
    showTimeList: Date[];
}

/*
showTimes: Array<string>;
*/

const Movie: FC<MovieProp> = (props: MovieProp) => {
    //const dateString = props.showTimes;
    //const showTimeDate = new Date(dateString);

    const hour = Math.floor(props.duration / 60);
    const minutes = (props.duration % 60);

   


    return (
        
        <div className='flex flex-col justify-between container h-[700px] w-[320px] bg-main-landing-color mb-4'>
            <div>
                <Image
                    src={props.movieImage}
                    alt='Title'
                    width={320}
                    height={480}
                />
            </div>
            <div className='relative ml-4 font-black text-white text-left'>
                {props.movieTitle}
            </div>
            <div className='relative ml-4 text-white mb-10'>
                Duration: {hour} {hour > 1 ? 'hours' : 'hour'} and {minutes} {minutes !== 1 ? 'minutes' : 'minute'}
            </div>
            <div className='relative mt-4 ml-4 font-black text-white mb-2'>
                {props.showTimeList.map((element, index) => (
                    <span key={index}> {(new Date(element)).getHours()} : {(new Date(element)).getMinutes()==0?'00': new Date(element).getMinutes()} | </span>
                ))}
            </div>
        </div>
    );
};

export default Movie;


/*

<span key={index}> {new Date(element).getHours()} : {new Date(element).getMinutes()==0?'00': new Date(element).getMinutes()} | </span>
*/