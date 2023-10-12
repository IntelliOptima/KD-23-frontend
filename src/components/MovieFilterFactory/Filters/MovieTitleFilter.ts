import { Movie } from "@/components/MoviesContainer/MovieCard/MovieCard";
import { MoviesSearchFilter } from "../BaseFilters/MovieSearchFilter";
import { IMovieFilter } from "../interfaces/IMovieFilter";

class MovieTitleFilter<T, K> extends MoviesSearchFilter<T, K> implements IMovieFilter<T, K> {

    public async filter(T: T, Page: K): Promise<Movie[]> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIE_API}/where-movie-title-contains=/${T}/page=/${Page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const movies = await response.json();
        return movies;
    }

    public static createFilter =<T, K> () : MoviesSearchFilter<T,K> => new MovieTitleFilter<T, K>();
    public static getClassName = (): string => "MovieTitleFilter";


}

export default MovieTitleFilter;