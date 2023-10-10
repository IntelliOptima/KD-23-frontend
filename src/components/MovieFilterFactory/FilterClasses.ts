import { MoviesSearchFilter } from "./BaseFilters/MovieSearchFilter";
import ActorNameFilter from "./Filters/ActorNameFilter";
import MovieGenreFilter from "./Filters/MovieGenreFilter";
import MovieRuntimeFilter from "./Filters/MovieRuntimeFilter";
import MovieTitleFilter from "./Filters/MovieTitleFilter";

abstract class FilterClass {

    public static readonly filterTypes: Record<string, FilterClass> = {
        'title': MovieTitleFilter,
        'actorName': ActorNameFilter,
        'genre': MovieGenreFilter,
        'runtime': MovieRuntimeFilter
    };

    public static getAllFilterTypes(): Record<string, FilterClass> {
        return this.filterTypes;
    }

    public static getFilterType(type: string): FilterClass {
        return this.filterTypes[type];
    }

    abstract createFilter<T>(): MoviesSearchFilter<T>
    abstract getClassName(): string;
}

export { FilterClass }
