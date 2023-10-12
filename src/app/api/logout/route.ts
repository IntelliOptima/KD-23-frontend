import { NextResponse } from 'next/server';


export async function POST() {

        const isLoggedIn = localStorage.getItem("isLoggedIn") === "false";
        console.log("isLoggedIn:", isLoggedIn);
        
        try{
            await fetch("localhost:8080/logout", {
            method: 'POST',
            
            credentials: "include",
        });}

        catch (error: any) {
            console.error('Error in logout route:', error.message || error);
        }
    return NextResponse.redirect('/login');
}

    
