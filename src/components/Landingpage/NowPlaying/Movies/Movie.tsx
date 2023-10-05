import Image from 'next/image';
import React from 'react';
import { FC } from 'react';

interface MovieProp {
    movieTitle: string;
    duration: string;
    movieImage: string;
    showTimes: object;

}


const Movie: FC<MovieProp> = (props :MovieProp) => {


    return(
       <div className='container bg-white mx-auto ' style={{ maxWidth: "320px", maxHeight: "700px"}}>
        <div><Image 
        src={props.movieImage}
        alt='Title'
        //fill={false}
        width={320}
        height={480}
        />
        </div>
       </div> 
    );
};

export default Movie