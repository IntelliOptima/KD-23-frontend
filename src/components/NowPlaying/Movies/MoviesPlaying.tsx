import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import MovieDetails from '@/components/MovieDetails/MovieDetails';

const MoviesPlaying = ({ movieData}) => {
    // Use state to store the movie data
    const [movieShow, setMovies] = useState([]);
  
    // Update the state when movieData prop changes
    useEffect(() => {
      setMovies(movieData);
    }, [movieData]);
           

  return (
    
    <div className='mt-20 flex justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
        {movieData.map((movie, index) => (
          <div key={index} className='flex justify-center'>
            <Movie 
              movieID={movie.movieID}
              movieTitle={movie.movieTitle}
              duration={movie.movieDuration}
              movieImage={movie.movieImage}
              showTimeList={movie.movieStartDateTimeList}   
              movieTrailer={movie.movieTrailer}
            />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPlaying;
