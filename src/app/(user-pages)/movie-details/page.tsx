"use client";

import MovieDetails from '@/components/MovieDetails/MovieDetails';
import { NextPage } from 'next';


const MovieDetailsPage: NextPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
      const movieID = Number(urlParams.get('movieID'));
    
  return (
    <div>
      <MovieDetails movieId={movieID} />
    </div>
  );
};

export default MovieDetailsPage;