type BuyTicketButtonProps = {
    buttonText: string;
}


const BuyTicketButton = ({buttonText}: BuyTicketButtonProps) =>{
    return (
    <button className=' absolute left-20 top-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded'>
        {buttonText}
    </button>
    )
}

export default BuyTicketButton;