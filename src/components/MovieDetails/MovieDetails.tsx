import React from 'react'
import MovieData from './MovieDetailsData.json';
import Image from 'next/image';

const MovieDetails = () => {

    const movieData = MovieData.movie;
    

  return (
    <div>
        <div className="relative h-[450px] w-[300px]">
            <Image 
            src={movieData.poster}
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
            alt='sdsad'
            />
           
        </div>
        <div>
            <h1>{movieData.title}</h1>
        </div>

        <div>
            
        </div>
        
    </div>
  )
}

export default MovieDetails