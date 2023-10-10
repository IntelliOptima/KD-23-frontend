// Interface
import { MoviesSearchFilter } from "./BaseFilters/MovieSearchFilter";
import { FilterClass } from "./FilterClasses";

class MovieFilterFactory {

    public static createFilter<T> (type: string): MoviesSearchFilter<T> {
        const filterInstance = FilterClass.getFilterType(type);

        if (!filterInstance) {
            throw new Error(`Filter type ${type} not supported.`);
        }

        console.log("Factory created FilterType: ", filterInstance.getClassName())
        return filterInstance.createFilter();
    }

    public static getFilterTypes(): Record<string, FilterClass> {
        return FilterClass.getAllFilterTypes();
    }
}


export { MovieFilterFactory };
