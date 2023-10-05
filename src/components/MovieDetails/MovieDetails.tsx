import React from 'react'
import MovieData from './MovieDetailsData.json';
import Image from 'next/image';

const MovieDetails = () => {

    const movieData = MovieData.movie;
    const hours = Math.floor(movieData.runtime / 60);
    const minutes = Math.floor(movieData.runtime % 60);
    const movieTrailerId = movieData.trailer.split('v=')[1];

    return (
        <div className="flex flex-col items-center">
            <div className="py-10">
                <h1 className="text-[80px] font-extrabold text-gray-600 tracking-wider">{movieData.title.toUpperCase()}</h1>
            </div>
            <div className="flex justify-around">

                <div className="relative h-[550px] w-[400px]">
                    <Image
                        src={movieData.poster}
                        className="rounded-lg shadow-2xl shadow-black"
                        layout="fill"
                        objectFit="cover"
                        alt='sdsad'
                    />

                </div>
                <div className=" flex flex-col items-center w-2/5">
                    <div className="grid grid-cols-3 bg-white p-6 rounded-2xl shadow-2xl shadow-black">
                        <div className="text-center">
                            <h3 className="text-[18px] font-semibold leading-loose">Released: </h3>
                            <p>{movieData.releaseDate}</p>
                        </div>

                        <div className="text-center">
                            <h3 className="text-[18px] font-semibold leading-loose">Movie Runtime: </h3>
                            <p>{hours} Hours {minutes} Minutes</p>
                        </div>

                        <div className="text-center">
                            <h3 className="text-[18px] font-semibold leading-loose">IMDB rating: </h3>
                            <p>{movieData.voteRating ? movieData.voteRating : 'No available rating'}</p>
                        </div>
                        <div className="col-span-3 my-6">
                            <p className="italic">{movieData.description}</p>
                        </div>
                        <div className="flex col-span-3 justify-between">
                            <div>
                                <h3 className="text-[18px] font-semibold leading-loose">Genre: </h3>
                                <p>Family, Animation</p>
                            </div>
                            <div >
                                <h3 className="text-[18px] font-semibold leading-loose">Actors: </h3>
                                <p>Tom Hanks, Tom Cruise, Will Smith</p>
                            </div>
                        </div>
                    </div>

                    <div className="my-20">
                        <iframe className="shadow-2xl shadow-black" src={`https://www.youtube.com/embed/${movieTrailerId}`} height={300} width={550}></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails