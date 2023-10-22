export type Theater = {
    id: number;
    name: string;
    type: string;
}

export type MovieShow = {
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

export type Seat = {
    id?: number;
    priceWeight: number;
    theaterId: number;
    row: number;
    numberInRow: number;
}


export type Movie = {
    id?: number;
    title?: string;
    poster?: string;
    trailer?: string;
    releaseDate?: Date;
    actors?: Actor[];
    genre?: Genre[];
    runtime: number; // in minutes
    voteRating?: number;
    description?: string;
};

export type Booking = {
    id?: number;
    email: string;
    movieShow?: MovieShow;
    seat: Seat;
}

export type BookingRequest = {
    email: string;
    showId: number;
    seatId: number;
}

export type StartTimeWithTheater = {
    startTime: Date;
    theater: Theater;
}

export type TheaterProps = {
    type: string;
    id: number;
    implementationStrategy: void | null;
    name: string;
    totalRows: number;
    seatsPerRow: number;
    seats: Seat[];
}

export type MovieForCinema = {
    trailer?: string;
    releaseDate?: Date;
    runtime?: number; // in minutes

};