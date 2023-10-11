import { Movie } from "@/components/MoviesContainer/MovieCard/MovieCard";
import { MoviesSearchFilter } from "../BaseFilters/MovieSearchFilter";
import { IMovieFilter } from "../interfaces/IMovieFilter";

class ActorNameFilter<T, K> extends MoviesSearchFilter<T, K> implements IMovieFilter<T, K> {

    public async filter(T: T, Page: K ): Promise<Movie[]> {
        const response = await fetch(`http://localhost:8080/movie/where-movie-actor-contains/${T}/page=/${Page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const movies = await response.json();
        return movies;
    }

    public static createFilter =<T, K> () : MoviesSearchFilter<T,K> => new ActorNameFilter<T, K>()
    public static getClassName = (): string => "ActorNameFilter";


}

export default ActorNameFilter;