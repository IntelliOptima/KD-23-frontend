import Input from "@/components/CustomInputs/Input";
import MoviesContainer from "@/components/MoviesContainer/MovieContainer"
import { useState } from "react";



const MovieSection = () => {
    const [page, setPage] = useState(0);

    return (
        <>
            <div className=" flex justify-between">
                <button disabled={page == 0} onClick={() => setPage(prev => prev - 1)}>Previous</button>
                <Input
                    htmlfor="searchBar"
                    placeholder="search title, actors, etc."
                    name="searchBar"
                    type="text"
                />
                <button onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>

            <MoviesContainer page={page} />
            <div className=" flex justify-between">
                <button disabled={page == 0} onClick={() => setPage(prev => prev - 1)}>Previous</button>
                <button onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div>
        </>
    )
}

export default MovieSection

