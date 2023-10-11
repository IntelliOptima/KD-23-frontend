import React, { Dispatch, SetStateAction, useState, useEffect, Fragment } from "react";
import MovieCard from "./MovieCard/MovieCard";
import Input from "@/components/CustomInputs/Input";
import { MovieFilterHandler } from "../MovieFilterFactory/FilterHandler";
import type { Movie } from "./MovieCard/MovieCard";
import GeneralButton from "@/components/Buttons/GeneralButton";

interface Props {
    setMovie: Dispatch<SetStateAction<Movie | null>>;
}

const MoviesContainer = ({ setMovie }: Props) => {
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState<string>("");
    const [movieCache, setMovieCache] = useState<Record<number, Movie[]>>({});
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); // mangler logik for filtering reaktivt!
    const [searchQuery, setSearchQuery] = useState<string>("");

    console.log(searchQuery)

    useEffect(() => {
        async function fetchMoviesWithFilter(targetPage: number) {
            if (movieCache[targetPage]) return;
    
            try {
                let movies: Movie[] = [];
        
                movies = await MovieFilterHandler<string | number, number>(searchQuery === "" ? "noFilter" : filter, searchQuery, targetPage);
        
                setMovieCache((prev) => ({ ...prev, [targetPage]: movies }));
            } catch (error: any) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        }
    
        fetchMoviesWithFilter(page);
    
        if (searchQuery === "") {
            for (let i = 1; i <= 3; i++) {
                fetchMoviesWithFilter(page + i);
            }
        }
    
    }, [page, filter, searchQuery, movieCache]);
    
    // Reset page to 0 whenever searchQuery changes
    useEffect(() => {
        setPage(0);
    }, [searchQuery]);

    const MemoizedMovieCard = React.memo(MovieCard);
    const [isChosen, setIsChosen] = useState<boolean>(false);
    const [choosenMovieIndex, setChoosenMovieIndex] = useState<number |null>(null);


    return (
        <Fragment>
            <div className=" flex justify-between items-baseline mb-5">
                <GeneralButton width="5%" type="button" disabled={page == 0} onClick={() => setPage(prev => prev - 1)} text="&lt;- Previous" />
                <div className="flex">
                    <Input
                        htmlfor="searchBar"
                        placeholder="search title, actors, etc."
                        name="searchBar"
                        type="text"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <label htmlFor="filter"></label>
                    <select name="filter" className="border-2 border-gray-500 rounded-md ml-5  p-1 hover:cursor-pointer"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter || ""}>
                        <option value="" disabled hidden>Filter by</option>
                        <option value="all">All</option>
                        <option value="title">Title</option>
                        <option value="actorName">Actors</option>
                        <option value="runtime">Runtime</option>
                        <option value="genre">Genre</option>
                    </select>
                </div>
                <GeneralButton width="5%" type="button" disabled={false} onClick={() => setPage(prev => prev + 1)} text="Next -&gt;" />
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
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
        <div className=" flex justify-between">
                <GeneralButton width="5%" type="button" disabled={page == 0} onClick={() => setPage(prev => prev - 1)} text="&lt;- Previous" />
                <GeneralButton width="5%" type="button" disabled={false} onClick={() => setPage(prev => prev + 1)} text="Next -&gt;" />
            </div>
        </Fragment>
    );
};

export default MoviesContainer;
