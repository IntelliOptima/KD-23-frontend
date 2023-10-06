import React from 'react';
import MovieMockData from '@components/Landingpage/NowPlaying/Movies/MovieMockData.json';
import Movie from './Movie';

const movieArr = MovieMockData.movieListOnDay;

const MoviesPlaying = () => {
    return (
        <div className='mt-20 flex justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6'>
                {movieArr.map((movie, index) => (
                    <div key={index} className='flex justify-center'>
                        <Movie 
                            movieTitle={movie.movieTitle}
                            duration={movie.duration}
                            movieImage={movie.movieImage}
                            showTimes={movie.showTimes}            
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesPlaying;

/*className='mt-10 justify-center items-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4

*/