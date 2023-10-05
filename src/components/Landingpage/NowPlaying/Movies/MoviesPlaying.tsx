import React from 'react';
import MovieMockData from '@components/Landingpage/NowPlaying/Movies/MovieMockData.json';
import Movie from './Movie';


const movieArr = MovieMockData;

const MoviesPlaying = () => {

    return(
        <div style={{maxHeight: "900px"}}>
        <Movie movieTitle={movieArr.movieListOnDay[0].movieTitle} duration={movieArr.movieListOnDay[0].duration}
        movieImage={movieArr.movieListOnDay[0].movieImage} showTimes={movieArr.movieListOnDay[0].showTimes}/>
        </div>
    );
};

export default MoviesPlaying;