import { MoviesSearchFilter } from "./BaseFilters/MovieSearchFilter";
import ActorNameFilter from "./Filters/ActorNameFilter";
import MovieGenreFilter from "./Filters/MovieGenreFilter";
import MovieNoFilter from "./Filters/MovieNoFilter";
import MovieRuntimeFilter from "./Filters/MovieRuntimeFilter";
import MovieTitleFilter from "./Filters/MovieTitleFilter";

abstract class FilterClass<T, K> {

    public static readonly filterTypes: Record<string, FilterClass<any, any>> = {
        'noFilter': MovieNoFilter,
        'title': MovieTitleFilter,
        'actorName': ActorNameFilter,
        'genre': MovieGenreFilter,
        'runtime': MovieRuntimeFilter
    };

    public static getAllFilterTypes(): Record<string, FilterClass<any, any>> {
        return this.filterTypes;
    }

    public static getFilterType(type: string): FilterClass<any,any> {
        return this.filterTypes[type];
    }

    abstract createFilter<T, K>(): MoviesSearchFilter<T, K>
    abstract getClassName(): string;
}

export { FilterClass }
