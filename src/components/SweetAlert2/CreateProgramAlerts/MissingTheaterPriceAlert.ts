import { Theater } from "@/Types/Types"
import Swal from "sweetalert2"

export const MissingTheaterPriceAlert = () => {
    Swal.fire(
        'Missing configurations',
        'WHOOOPSIE - remember to set a THEATER and PRICE for your new program.',
        'info'
        )
}

export const MissingTheaterOrPriceAlert = (chosenTheater: Theater | undefined) => {
    Swal.fire(
        'Missing configurations',
        `WHOOOPSIE - remember to set ${chosenTheater === undefined ? 'a THEATER' : 'PRICE'} for your new program.`,
        'info'
        )
}