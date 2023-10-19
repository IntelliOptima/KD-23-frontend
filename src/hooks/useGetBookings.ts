import { useEffect, useState } from "react";
import { TheaterProps, Booking, MovieForCinema, Movie } from "@/Types/Types";

const useGetBookings = (showId: number, theaterId: number, movieId: number) => {
    const [theaterData, setTheaterData] = useState<TheaterProps | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [movie, setMovie] = useState<MovieForCinema>({});

    

    const fetchBookingData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BOOKING_API}/find-all-by-movie-show/${showId}`);
          if (!response.ok) {
            console.log('Response not OK');
            return;
          }
          const data = await response.json();
          setBookings(data);
        } catch (error) {
          console.error('Error fetching booking data:', error);
        }
      }
    
      const fetchMovieData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIE_API}/id=/${movieId}`);
          if (!response.ok) {
            console.log('Response not OK');
            return;
          }
          const data = await response.json();
          setMovie(data);
        } catch (error) {
          console.error('Error fetching booking data:', error);
        }
      }

    
      const fetchTheaterData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_THEATER_API}/id=/${theaterId}`);
          if (!response.ok) {
            console.log('Response not OK');
            return;
          }
          const data = await response.json();
          setTheaterData(data);
        } catch (error) {
          console.error('Error fetching theater data:', error);
        }
      }


    useEffect(() => {
          fetchBookingData();
          fetchTheaterData();
          fetchMovieData();
          console.log("Fetching")
      }, [theaterData,bookings]);
      
      

      return {theaterData,bookings, movie};
}
export default useGetBookings