import { Movie } from "@/Types/Types";
import { MovieFilterFactory } from "./MovieFilterFactory";

export const MovieFilterHandler = async <T, K> ( type: string, T: T, Page: K ): Promise<Movie[]> => {
    const filterInstance = MovieFilterFactory.createFilter(type);
    console.log(filterInstance)
    return filterInstance.filter(T, Page);
};

