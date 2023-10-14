import Input from "@/components/CustomInputs/Input";
import { Movie } from "@/Types/Types";
import MoviesContainer from "@/components/MoviesContainer/MovieContainer"
import { Dispatch, useState, SetStateAction } from "react";
import GeneralButton from "@/components/Buttons/GeneralButton";

type MovieSectionProps = {
    setMovie: Dispatch<SetStateAction<Movie | null>>;
};


const MovieSection = ({ setMovie }: MovieSectionProps) => {

    return (
        <div className="flex flex-col">
            <MoviesContainer setMovie={setMovie} />
        </div>
    )
}

export default MovieSection

