import { Movie } from "@/Types/Types";

interface IMovieFilter<T, K> {
    filter(T: T, Page: K): Promise<Movie[]>;
}

export type { IMovieFilter }