import { Movie } from "@/components/MoviesContainer/MovieCard/MovieCard";

interface IMovieFilter<T, K> {
    filter(T: T, Page: K): Promise<Movie[]>;
}

export type { IMovieFilter }