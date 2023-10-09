import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        console.log("Logout route hit. Forwarding to backend.");
        const JWT = request.cookies.get('token');

        if (JWT) {

            const backendResponse = await fetch("localhost:3000/logout", {
                method: 'POST',
                headers: {
                    'Cookie': `token=${JWT.value}`, // Use semicolons to separate cookies
                },
                credentials: "include",
            });


            if (!backendResponse.ok) {
                const text = await backendResponse.text();
                console.error("Error from backend:", text);
                throw new Error(`Backend responded with status: ${backendResponse.status}`);
            }

            const res = await backendResponse.json();

            if (res.message == 'Logout successful') {
                console.log("Logout successful!")
                return NextResponse.json({ success: true, message: 'Logout successful' });
            } else {
                console.log("Logout failed:", res.message || "No error message provided");
                return NextResponse.json({ success: false, message: res.message || "No error message provided" }, { status: 500 });
            }
        } else {
            console.log("No cookies found in request.");
            return NextResponse.json({ success: false, message: "No cookies found in request." }, { status: 400 });
        }

    } catch (error: any) {
        console.error('Error in logout route:', error.message || error);
        return NextResponse.json({ success: false, message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
