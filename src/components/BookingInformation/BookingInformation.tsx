"use client";

import React, { useEffect } from 'react'
import Input from "@/components/CustomInputs/Input";
import BookingInformationData from './BookingInformationMockData.json';


const BookingInformation = ({ }) => {

    
    const MovieShowData = BookingInformationData;
    const formattedDate = new Date(MovieShowData.startDateTime).toLocaleDateString();
    const formattedTime = new Date(MovieShowData.startDateTime).toLocaleTimeString().substring(0, 5);
    const [bookingInformation, setBookingInformation] = React.useState({
        "Email": ""
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(bookingInformation),
            });
            console.log(response);
        } catch (error: any) {
            console.error("There was a problem with the fetch operation:", error.message);
        }
    }

    return (
        <div>
            <div className="h-screen bg-white w-[400px] px-10">
                <h1 className="text-center text-3xl font-bold py-8">Booking Information</h1>
                <form onSubmit={handleSubmit}>
                    <p>Input Email to send the ticket to: </p>
                    <Input
                        htmlfor="email"
                        placeholder="E-mail"
                        name="email"
                        type="email"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setBookingInformation({
                                ...bookingInformation,
                                "Email": e.target.value
                            })
                        }}
                    />

                    <div>


                        <div className="py-2">
                            <h2 className="py-8 text-xl">Ticket Information:</h2>
                            <p className="text-lg font-semibold">Movie:</p>
                            <h2 className="py-1 text-lg">{MovieShowData.movie.title} - {formattedDate} - {formattedTime}</h2>
                        </div>

                        <div className="py-2">
                        <p className="text-lg font-semibold">Seats:</p>
                        {/*{Map seats to see how many are clicked off.}*/}
                        <h2 className="py-1 text-lg">Row - 2 Seat number - 4</h2>
                        <h2 className="py-1 text-lg">Row - 2 Seat number - 5</h2>
                        </div>

                        <div className="flex items-center w-1/2 justify-between py-2 ">
                        <p className="text-lg font-semibold">Price:</p>
                            {/* Make a total amount based on seat weight, movieshow price and seat count */}
                            <p>{MovieShowData.price} ,- dkk</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center py-8">
                        <button className="btn-primary" type="submit">
                            Buy Ticket
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookingInformation