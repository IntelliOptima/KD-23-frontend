/**
 * Handles POST requests to the login route.
 * 
 * This function receives a JSON payload containing an email and password, and forwards the request to a microservice
 * responsible for authenticating the user. If the authentication is successful, the function extracts the token, session,
 * and refresh token from the Set-Cookie header of the microservice response, and returns a JSON response containing the
 * user ID and a new cookie with the extracted tokens.
 * 
 * @param request - The incoming request object.
 * @returns A Next.js `NextResponse` object with a JSON payload containing the user ID and a new cookie with the extracted tokens,
 * or an error message and status code if the authentication fails or an error occurs.
 */

import { NextResponse } from 'next/server';
import {serialize, parse  } from "cookie"

export async function POST(request: Request) {
    const isProduction = process.env.NODE_ENV === 'production';
    const { email, password } = await request.json();

    try {
        // Forward the request to the microservice
        const backendResponse = await fetch(`http://localhost:8080/api/v1/auth/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({  email, password }),
        });

        // Parse the Set-Cookie header
        const parsedCookies = parse(backendResponse.headers.get('Set-Cookie') || '');

        const { token } = parsedCookies;

        if (!token) {
            console.error('Token not found in cookie');
            return NextResponse.json({ success: false, message: 'Authentication failed' }, { status: 401 });
        }

        const userID = await backendResponse.json().then(data => data.id);
        
        // Serialize the cookies
        const tokenString = serialize('token', token, {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            secure: isProduction,
        });

        return NextResponse.json({ success: true, data: userID }, { status: 200, headers: { 'Set-Cookie': tokenString } });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
