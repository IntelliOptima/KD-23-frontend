import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { Show } from '@/Types/Types';


const MoviesPlaying = (movieShows: Show[]) => {    
  const [uniqueMovies, setUniqueMovies] = useState<Movie[]>([]);

  
  useEffect(() => {
    const movies = movieShows.map((show) => show.movie);
    const uniqueMovies = movies.filter((movie, index, self) => 
      index === self.findIndex((m) => (
        m.id === movie.id
      ))
    );
    setUniqueMovies(uniqueMovies);
  }, [movieShows]);


  const getStartingTimesForMovie = (id: number) => {
    const startingTimes = movieShows.filter((show) => show.movie.id === id);
    const startingTimesForMovie = startingTimes.map((show) => show.startDateTime);
    return startingTimesForMovie;
  }

  return (
    <div className='mt-20 flex justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
        {uniqueMovies.map((movie, index) => 
        movie.id &&
          <div key={index} className='flex justify-center'>
            <Movie 
              movie={movie}
              startingDateTimes={getStartingTimesForMovie(movie.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesPlaying;
