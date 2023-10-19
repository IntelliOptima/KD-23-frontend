import { useRouter } from "next/navigation";
import { BookingRequest, Seat } from "@/Types/Types";
import Swal from 'sweetalert2';

interface TicketMenuProps{
    selectedSeats: Seat[];
    showPrice: number;
    showId: number;
}


const TicketMenu = ({selectedSeats, showPrice, showId}: TicketMenuProps) => {
    
    const router = useRouter();

    const createBookingFetch = async (email: string) => {
        const bookingsArrayForSubmit: BookingRequest[] = [];
        selectedSeats.forEach(seat => {
          if (seat.id === undefined) {
            console.log('Seat id is undefined, skipping this seat');
            return;
          }
    
          const bookingForSubmit: BookingRequest = {
            email: email,
            showId: showId,
            seatId: seat.id,
          };
    
          console.log(bookingForSubmit)
          bookingsArrayForSubmit.push(bookingForSubmit);
        });
    
        const objectAsJsonString = JSON.stringify(bookingsArrayForSubmit);
        console.log(objectAsJsonString)
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BOOKING_API}`, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: objectAsJsonString,
            credentials: "include",
          });
          if (!response.ok) {
            const errorMessage = await response.text();
            console.log("Response is not OK");
            throw new Error(errorMessage);
          } else {
            console.log("OKAY POST DID GO WELL")
          }
        } catch (error: any) {
          console.log("The fetch resulted in an error", error);
        }
    
      };

    function generateTotalPrice(selectedSeats: Seat[]) {
        let totalPrice = 0;
        selectedSeats.forEach((seat) => {
    
          totalPrice += (seat.priceWeight * showPrice)
        });
    
        return totalPrice;
      }

    const handleEmailInputSwal = async () => {
        const { value: email } = await Swal.fire({
          title: 'Input email address for your booking',
          input: 'email',
          inputLabel: 'Your email address',
          inputPlaceholder: 'Enter your email address',
        });
    
        if (email) {
          Swal.fire(`Entered email: ${email}`)
    
          createBookingFetch(email);
          router.push('/')
        }
      }

    return (
        <><div className="selected-seats flex flex-row">
            <h1 className="text-white w-20 h-50 mt-20">Valgte sæder</h1>
            <div className='flex flex-row space-x-2'>
                {selectedSeats.map((seat, index) => (
                    <div className='flex flex-col bg-blue-500 p-2' key={index}>
                        <p>ID:{seat.id}</p>
                        <span>Række: {seat.row}</span>
                        <span>Sæde: {seat.numberInRow}</span>
                        <span></span>
                        <span>Pris: {showPrice}</span>
                    </div>
                ))}
            </div>
        </div><div className='text-white mt-16'>
                <span>Total pris:  {generateTotalPrice(selectedSeats)}</span>

                <button
                    onClick={() => handleEmailInputSwal()}
                    className='btn-primary ml-4'
                >
                    Book selected seats</button>
            </div></>

    );
}

export default TicketMenu;