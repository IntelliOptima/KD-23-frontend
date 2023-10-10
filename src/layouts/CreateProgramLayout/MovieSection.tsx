import Input from "@/components/CustomInputs/Input";
import type { Movie } from "@/components/MoviesContainer/MovieCard/MovieCard";
import MoviesContainer from "@/components/MoviesContainer/MovieContainer"
import { Dispatch, useState, SetStateAction } from "react";
import GeneralButton from "@/components/Buttons/GeneralButton";

type MovieSectionProps = {
    setMovie: Dispatch<SetStateAction<Movie | null>>;
};



const MovieSection = ({ setMovie }: MovieSectionProps) => {
    const [page, setPage] = useState(0);
    const [filter, setFilter] = useState<string>("");

    return (
        <div className="flex flex-col">
            <div className=" flex justify-between items-baseline mb-5">
                <GeneralButton width="5%" type="button" disabled={page == 0} onClick={() => setPage(prev => prev - 1)} text="&lt;- Previous" />
                <div className="flex">
                    <Input
                        htmlfor="searchBar"
                        placeholder="search title, actors, etc."
                        name="searchBar"
                        type="text"
                    />
                    <label htmlFor="filter"></label>
                    <select name="filter" className="border-2 border-gray-500 rounded-md ml-5  p-1 hover:cursor-pointer"
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter || ""}>
                        <option value="" disabled hidden>Filter by</option>
                        <option value="all">All</option>
                        <option value="title">Title</option>
                        <option value="actors">Actors</option>
                        <option value="director">Director</option>
                        <option value="genre">Genre</option>
                    </select>
                </div>
                <GeneralButton width="5%" type="button" disabled={false} onClick={() => setPage(prev => prev + 1)} text="Next -&gt;" />
            </div>

            <MoviesContainer page={page} setMovie={setMovie} />
            <div className=" flex justify-between">
                <GeneralButton width="5%" type="button" disabled={page == 0} onClick={() => setPage(prev => prev - 1)} text="&lt;- Previous" />
                <GeneralButton width="5%" type="button" disabled={false} onClick={() => setPage(prev => prev + 1)} text="Next -&gt;" />
            </div>
        </div>
    )
}

export default MovieSection

