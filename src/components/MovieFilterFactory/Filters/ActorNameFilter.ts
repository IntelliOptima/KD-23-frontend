import { MoviesSearchFilter } from "../BaseFilters/MovieSearchFilter";

class ActorNameFilter<T> extends MoviesSearchFilter<T> {
    
    createFilter<T>(): MoviesSearchFilter<T> {
        throw new Error("Method not implemented.");
    }
    getClassName(): string {
        throw new Error("Method not implemented.");
    }

    public filter(T: T): void {
        throw new Error("Method not implemented.");
    }

}

export default ActorNameFilter;