import { MovieFilterFactory } from "./MovieFilterFactory";

export const MovieFilterHandler = <T> ( type: string, T: T ): void => {
    const filterInstance = MovieFilterFactory.createFilter(type);
    filterInstance.filter(T);
};

