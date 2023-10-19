import { useEffect, useState } from "react";
import { TheaterProps, Booking } from "@/Types/Types";

const useGetBookings = (showId: number, theaterId: number) => {
    const [IsLoading, setIsLoading] = useState(true);
    const [theaterData, setTheaterData] = useState<TheaterProps | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);


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
        console.log("UseEffect Ran")
        const fetchData = async () => {
          await fetchBookingData();
          await fetchTheaterData();
          setIsLoading(false);
        };
    
        fetchData();
      }, []);
      
      

      return {theaterData,bookings,IsLoading};
}
export default useGetBookings