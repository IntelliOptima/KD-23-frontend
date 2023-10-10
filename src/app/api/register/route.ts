import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        console.log("Register account request received");

        // Forward the request to the microservice
        const backendResponse = await fetch(`http://localhost:8080/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ email: email, password: password }),
        });

        console.log("backendResponse responeded with: ", backendResponse);

        if (!backendResponse.ok) {
            console.error("Error from backend:", backendResponse.statusText);
            throw new Error(`Backend responded with status: ${backendResponse.status}`);
        } else {
            return NextResponse.json({ success: true, message: "You have successfully registered an account!" }, { status: 200});
        }
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}