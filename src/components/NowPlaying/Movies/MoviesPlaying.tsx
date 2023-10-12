import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { Show, StartTimeWithTheater } from '@/Types/Types';

type MoviesPlayingProps = {
  movieShows: Show[];
};

const MoviesPlaying = ({movieShows}: MoviesPlayingProps) => {    
  const [uniqueMovies, setUniqueMovies] = useState<Movie[]>([]);

  
  useEffect(() => {
    if (Array.isArray(movieShows)) {
      const movies = movieShows.map((show) => show.movie);
      const uniqueMovies = movies.filter((movie, index, self) => 
        index === self.findIndex((m) => (
          m.id === movie.id
        ))
      );
      setUniqueMovies(uniqueMovies);
    }
  }, [movieShows]);


  const getStartingTimesWithTheaterForMovie = (id: number): StartTimeWithTheater[] => {
    const startingTimes = movieShows.filter((show) => show.movie.id === id);
    const startingTimesWithTheatersForMovie = startingTimes.map((show) => ({
        startTime: show.startDateTime,
        theater: show.theater,
    }));
    return startingTimesWithTheatersForMovie;
};

  return (
    <div className='mt-20 flex justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
        {uniqueMovies.map((movie, index) => 
        movie.id &&
          <div key={index} className='flex justify-center'>
            <Movie 
              movie={movie}
              startTimesWithTheaters={getStartingTimesWithTheaterForMovie(movie.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesPlaying;
