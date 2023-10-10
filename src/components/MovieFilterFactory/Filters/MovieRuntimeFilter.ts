import { MoviesSearchFilter } from "../BaseFilters/MovieSearchFilter";

class MovieRuntimeFilter<T> extends MoviesSearchFilter<T> {

    public filter(T: T): void {
        throw new Error("Method not implemented.");
    }


}

export default MovieRuntimeFilter;