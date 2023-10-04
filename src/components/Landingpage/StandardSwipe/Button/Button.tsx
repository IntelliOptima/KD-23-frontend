


// Missing logic for handling the button click, and the button is not a button, but a div.
const BuyTicketButton = () =>{
    return (
    <button className=' absolute left-20 top-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded'>
        {/* Buttons shouldn't have paragraphs inside */}
        <p>Buy Ticket</p>
    </button>
    )
}

export default BuyTicketButton;