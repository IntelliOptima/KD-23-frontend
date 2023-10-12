"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';

type MovieDetailsProp = {
    movieId: number;
}


const MovieDetails = ( {movieId}: MovieDetailsProp ) => {

    

    const [movieData, setMovieData] = useState({
        title: "",
        poster: "",
        actors: [],
        genres: [],
        trailer: "",
        releaseDate: "",
        runtime: 0,
        voteRating: 0.0,
        description: "",
    });
    console.log("Fetch url" + 'http://localhost:8080/movie/id=/'+ movieId)
    
    const hours = Math.floor(movieData.runtime / 60);
    const minutes = Math.floor(movieData.runtime % 60);
    const movieTrailerId = movieData.trailer.split('v=')[1];
    const currentDate = new Date();
    const weekDates = [];

    useEffect(() => {
        const fetchData = async () => {
            const movieDataResponse = await fetch('http://localhost:8080/movie/id=/'+ movieId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await movieDataResponse.json();
            if (movieDataResponse.ok) {
                setMovieData(data);
                
            } else {
                console.log('error');
            }
        };
        fetchData();
    }, [movieId]);


    console.log(movieData);

    for (let i = 0; i < 7; i++) {
        let nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + i);
        weekDates.push(nextDay.toDateString());
    }


    
    return (
        
        <div className="flex flex-col items-center">
            <div className="py-10">
                <h1 className="text-[80px] font-extrabold text-white tracking-wider">{movieData.title}</h1>
            </div>

            <div className="flex my-10 gap-4 pb-10">
                {weekDates.map((date, index) => (
                    <table key={index} className="border border-collapse w-40 ">
                        <thead className="bg-white text-center">
                            <tr>
                                <th className="p-2">{date}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="flex flex-col text-center p-2 bg-gray-600 gap-4">
                                    <a href="/" className="flex justify-center text-[#F1A94B] text-[18px] font-bold hover:scale-105">
                                        12:00
                                        <Image src="/ticket.png" width={30} height={30} alt="ticket icon" className="ml-2" />
                                    </a>
                                    <a href="/" className="flex justify-center text-[#F1A94B] text-[18px] font-bold hover:scale-105">
                                        14:00
                                        <Image src="/ticket.png" width={30} height={30} alt="ticket icon" className="ml-2" />
                                    </a>
                                    <a href="/" className="flex justify-center text-[#F1A94B] text-[18px] font-bold hover:scale-105">
                                        16:00
                                        <Image src="/ticket.png" width={30} height={30} alt="ticket icon" className="ml-2" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>


            <div className="flex justify-around">

                <div className="relative h-[650px] w-[500px]">
                    <Image
                        src={movieData.poster}
                        className="rounded-lg shadow-2xl shadow-black"
                        layout="fill"
                        objectFit="cover"
                        alt='movie poster'
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
                            <h3 className="text-[18px] font-semibold leading-loose"> IMDB rating: </h3>
                            <p>{movieData.voteRating ? movieData.voteRating : 'No available rating'}</p>
                        </div>
                        <div className="col-span-3 my-6">
                            <p className="italic">{movieData.description}</p>
                        </div>
                        <div className="flex col-span-3 justify-between">
                            <div className="col-span-1">
                                <h3 className="text-[18px] font-semibold leading-loose">Genre: </h3>
                                <p>{movieData.genres.map(genre => genre.name).join(', ')}</p>
                            </div>
                            <div className="col-span-3">
                                <h3 className="text-[18px] font-semibold leading-loose">Actors: </h3>
                                <p>{movieData.actors.map(actor => actor.name).join(', ')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="my-20">
                        <iframe className="shadow-2xl shadow-black" src={`https://www.youtube.com/embed/${movieTrailerId}}`} height={300} width={550}></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default MovieDetails