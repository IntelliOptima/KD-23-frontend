import { Movie } from "@/components/MoviesContainer/MovieCard/MovieCard";
import { IMovieFilter } from "../interfaces/IMovieFilter";

abstract class MoviesSearchFilter<T, K> implements IMovieFilter<T, K> {
    public abstract filter(T: T, Page: K): Promise<Movie[]>;

    // Factory Method --- This acts as a guideline, each subclass implements their own version of creation.
    // @ts-ignore
        public static createFilter(): MoviesSearchFilter {
        throw new Error("This method should be overridden by subclass");
    }

    public static getClassName(): string {
        throw new Error("This method should be overridden by subclass");
    }
}


export { MoviesSearchFilter }


