import { Movie } from "@/components/MoviesContainer/MovieCard/MovieCard";
import { MoviesSearchFilter } from "../BaseFilters/MovieSearchFilter";
import { IMovieFilter } from "../interfaces/IMovieFilter";

class MovieGenreFilter<T, K> extends MoviesSearchFilter<T, K> implements IMovieFilter<T, K> {

    public async filter(T: T, Page: K): Promise<Movie[]> {
        const response = await fetch(`http://localhost:8080/movie/where-movie-genre-contains=/${T}/page=/${Page}`, {
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

    public static createFilter =<T, K> () : MoviesSearchFilter<T,K> => new MovieGenreFilter<T, K>()
    public static getClassName = (): string => "MovieGenreFilter";
}

export default MovieGenreFilter;