import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Movie, Show, StartTimeWithTheater, Theater } from '@/Types/Types';
import NoMoviePoster from '@/public/assets/images/NoPoster.jpeg';
// import BoockTicket from '@/components/BookTicket/BookTicket';


type MovieProps = {
    movie: Movie;
    startTimesWithTheaters: StartTimeWithTheater[];
}


const Movie = ({ movie, startTimesWithTheaters }: MovieProps) => {

    const hour = Math.floor(movie.runtime / 60);
    const minutes = (movie.runtime % 60);
    console.log(startTimesWithTheaters)



    return (

        <div className='flex flex-col justify-between container h-[700px] w-[320px] bg-main-landing-color mb-4'>
            <Link href={`/movie-details/${movie.id}`}>

                <div>
                    <Image
                        src={movie.poster || NoMoviePoster}
                        alt={movie.title + " poster"}
                        width={320}
                        height={480}
                    />
                </div>
            </Link>
            <div className='relative ml-4 font-black text-white text-left'>
                <p>{movie.title}</p>
            </div>
            <div className='relative ml-4 text-white mb-10'>
                Duration: {hour} {hour > 1 ? 'hours' : 'hour'} and {minutes} {minutes !== 1 ? 'minutes' : 'minute'}
            </div>

            <div className='relative mt-4 ml-4 font-black text-white mb-2'>
                {startTimesWithTheaters.sort((a, b) =>
                    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
                ).map((startTimeWithTheater, index) => (
                    <>
                        <Link
                            key={index}
                            href={`/book-ticket/${movie.id}/${startTimeWithTheater.startTime}/${startTimeWithTheater.theater.id}})`}
                        ><span key={index}>
                                {(new Date(startTimeWithTheater.startTime)).getHours()} : {(new Date(startTimeWithTheater.startTime)).getMinutes() == 0 ? '00' : new Date(startTimeWithTheater.startTime).getMinutes()} |
                            </span>
                        </Link>
                    </>

                ))}
            </div>

        </div>
    );
};

export default Movie;


