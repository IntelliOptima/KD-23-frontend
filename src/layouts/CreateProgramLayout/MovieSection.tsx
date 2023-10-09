import Input from "@/components/CustomInputs/Input";
import type { Movie } from "@/components/MoviesContainer/MovieCard/MovieCard";
import MoviesContainer from "@/components/MoviesContainer/MovieContainer"
import { Dispatch, useState, SetStateAction } from "react";

type MovieSectionProps = {
    setMovie: Dispatch<SetStateAction<Movie | null>>;
};



const MovieSection = ({setMovie}: MovieSectionProps) => {
    const [page, setPage] = useState(0);

    return (
        <div className="flex flex-col">
            <div className=" flex justify-between mb-5">
                <button disabled={page == 0} onClick={() => setPage(prev => prev - 1)}>Previous</button>
                <Input
                    htmlfor="searchBar"
                    placeholder="search title, actors, etc."
                    name="searchBar"
                    type="text"
                />
                <button onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>

            <MoviesContainer page={page} setMovie={setMovie} />
            <div className=" flex justify-between">
                <button disabled={page == 0} onClick={() => setPage(prev => prev - 1)}>Previous</button>
                <button onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>
        </div>
    )
}

export default MovieSection

