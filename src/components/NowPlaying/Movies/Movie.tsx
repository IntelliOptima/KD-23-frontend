import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Movie, Show } from '@/Types/Types';
import BoockTicket from '@/components/BookTicket/BookTicket';

type MovieProps = {
    movie: Movie;
    startingDateTimes: Date[];
}


const Movie = ({ movie, startingDateTimes }: MovieProps ) => {

    const hour = Math.floor(duration / 60);
    const minutes = (duration % 60);
    console.log(showTimeList)
    /* 
      const ticketData = {
          movieID: movieID,
          movieTitle: movieTitle,
          duration: duration,
          movieImage: movieImage
        };
  */

    return (

        <div className='flex flex-col justify-between container h-[700px] w-[320px] bg-main-landing-color mb-4'>
            <Link href={{
                pathname: '/movie-details',
                query: {
                    movieID: movieID,
                }
            }}>
                <div>
                    <Image
                        src={movieImage}
                        alt='Title'
                        width={320}
                        height={480}
                    />
                </div>
                </Link>
                <div className='relative ml-4 font-black text-white text-left'>
                    {movieTitle}
                </div>
                <div className='relative ml-4 text-white mb-10'>
                    Duration: {hour} {hour > 1 ? 'hours' : 'hour'} and {minutes} {minutes !== 1 ? 'minutes' : 'minute'}
                </div>

                <div className='relative mt-4 ml-4 font-black text-white mb-2'>
                    {showTimeList.map((element, index) => (
                        <>
                            <Link
                                key={index}
                                href={{
                                    pathname: '/book-ticket',
                                    query: {
                                        movieID: movieID,
                                        movieTitle: movieTitle,
                                        movieImage: movieImage,
                                        duration: duration,
                                        showTime: element[0],
                                        theaterID: element[1]
                                    },
                                }}
                            ><span key={index}>
                                    {(new Date(element[0])).getHours()} : {(new Date(element[0])).getMinutes() == 0 ? '00' : new Date(element[0]).getMinutes()} |
                                </span>
                            </Link>
                        </>

                    ))}
                </div>
            
        </div>
    );
};

export default Movie;


