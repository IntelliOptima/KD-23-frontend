import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import MovieCard from "./MovieCard/MovieCard";
import type { Movie } from "./MovieCard/MovieCard";
import { set } from "react-hook-form";

interface Props {
    page: number;
    setMovie: Dispatch<SetStateAction<Movie | null>>;
}

const MoviesContainer = ({ page, setMovie }: Props) => {
    const [movieCache, setMovieCache] = useState<Record<number, Movie[]>>({});
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        async function fetchMovies(targetPage: number) {
            if (movieCache[targetPage]) return;

            try {
                const response = await fetch(`https://kinoxpbackend.azurewebsites.net/movie/page=/${targetPage}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setMovieCache((prev) => ({ ...prev, [targetPage]: data }));
            } catch (error: any) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        }

        // Fetch current page and next 3 pages
        for (let i = 0; i <= 3; i++) {
            fetchMovies(page + i);
        }
    }, [page, movieCache]);

    const MemoizedMovieCard = React.memo(MovieCard);
    const [isChosen, setIsChosen] = useState<boolean>(false);
    const [choosenMovieIndex, setChoosenMovieIndex] = useState<number |null>(null);


    return (
        <div className="movies-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
            {movieCache[page]?.map((movie, index) => (
                <div key={index} className={`hover:cursor-pointer ${isChosen && index === choosenMovieIndex ? ' border-green-700 border-4' : ''}`}

                    onClick={() => {
                        setIsChosen(true)
                        setMovie(movie)
                        setChoosenMovieIndex(index)
                    }}>
                    <MemoizedMovieCard movie={movie} />
                </div>
            ))}
        </div>
    );
};

export default MoviesContainer;
