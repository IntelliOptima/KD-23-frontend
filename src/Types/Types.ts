export type Theater = {
    id: number;
    name: string;
    type: string;
}

export type Show = {
    id?: number;
    startDateTime: Date;
    movie: Movie;
    price: number;
    theater: Theater;
}

export type Actor = {
    id: number;
    name: string;
};

export type Genre = {
    id: number;
    name: string;
};

export type Movie = {
    title?: string;
    poster?: string;
    actors?: Actor[];
    genre?: Genre[];
    runtime: number; // in minutes
    voteRating?: number;
    description?: string;
};