interface IMovieFilter<T> {
    filter(T: T): void;
}

export type { IMovieFilter }