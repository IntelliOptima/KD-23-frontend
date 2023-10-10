import { MoviesSearchFilter } from "../BaseFilters/MovieSearchFilter";

class MovieGenreFilter<T> extends MoviesSearchFilter<T> {

    public filter(T: T): void {
        throw new Error("Method not implemented.");
    }
}

export default MovieGenreFilter;