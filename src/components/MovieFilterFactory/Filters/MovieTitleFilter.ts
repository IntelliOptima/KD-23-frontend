import { MoviesSearchFilter } from "../BaseFilters/MovieSearchFilter";

class MovieTitleFilter<T> extends MoviesSearchFilter<T> {

    public filter(T: T): void {
        throw new Error("Method not implemented.");
    }

}

export default MovieTitleFilter;