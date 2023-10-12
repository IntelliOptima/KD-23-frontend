"use client";
import MovieDetails from '@/components/MovieDetails/MovieDetails';

const MovieDetailsPage = ({params} : {params: {movieID: number}}) => {
    return (
        <div>
            <MovieDetails movieId={params.movieID} />
        </div>
    );
};

export default MovieDetailsPage;