import { useRouter } from "next/navigation";
import { BookingRequest, Seat } from "@/Types/Types";
import Swal from 'sweetalert2';

interface TicketMenuProps {
  selectedSeats: Seat[];
  showPrice: number;
  showId: number;
}


const TicketMenu = ({ selectedSeats, showPrice, showId }: TicketMenuProps) => {

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
    <>
      <div className=' ml-5 text-white mt-16'>
        <span>Total price:  {generateTotalPrice(selectedSeats)}</span>
        <button
          onClick={() => handleEmailInputSwal()}
          className='btn-primary ml-4'>
          Book selected seats</button>
      </div>
      <div className="ml-5 selected-seats space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
  <h1 className="text-white text-2xl">Chosen Seats</h1>
  {selectedSeats.map((seat, index) => (
    <div className="bg-blue-500 p-4 ml-1 mt-2 w-30 h-14 flex flex-col rounded-lg shadow-md" key={index}>
      <div className="flex justify-between">
        <div>
          <span className="text-white text-lg font-semibold">Row {seat.row} -</span>
          <span className="text-white text-lg font-semibold"> Seat {seat.numberInRow}</span>
        </div>
        <span className="text-gray-300">Price: {showPrice}</span>
      </div>
    </div>
  ))}
</div>

    </>
  );
}

export default TicketMenu;

/*
<div className=" ml-5 selected-seats flex flex-column">
        <h1 className="text-white w-20 h-50 mt-20">Chosen seats</h1>
        <div className='flex flex-col space-x-2'>
          {selectedSeats.map((seat, index) => (
            <div className='ml-1 mt-2 flex flex-col w-22 h-20 bg-blue-500 p-2' key={index}>
              <span>Row: {seat.row}</span>
              <span>Seat: {seat.numberInRow}</span>
              <span></span>
              <span>Price: {showPrice}</span>
            </div>
          ))}
        </div>
      </div>
*/