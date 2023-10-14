import { Movie } from "@/Types/Types";
import { MoviesSearchFilter } from "../BaseFilters/MovieSearchFilter";
import { IMovieFilter } from "../interfaces/IMovieFilter";

class MovieRuntimeFilter<T, K> extends MoviesSearchFilter<T, K> implements IMovieFilter<T, K> {

    public async filter(T: T, Page: K): Promise<Movie[]> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIE_API}/runtime-less-than/${T}/page=/${Page}`, {
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

    public static createFilter =<T, K> () : MoviesSearchFilter<T,K> => new MovieRuntimeFilter<T, K>();
    public static getClassName = (): string => "MovieRuntimeFilter";



}

export default MovieRuntimeFilter;