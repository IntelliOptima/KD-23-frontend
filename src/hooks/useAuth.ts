"use client";
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for useRouter

/**
 * Custom hook for handling user authentication.
 * @returns An object containing a function to handle form submission.
 */
const useAuth = (url:string) => {
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            
                body: JSON.stringify({ email, password }), // Send JSON data
            });

            console.log("Login request sent");
            console.log("Response status:", response.status, "Response status text:", response.statusText);
            console.log("email: ", email, "Password: ", password)

            if (!response.ok) {
                console.error("Response was not OK. Status:", response.status);
                return;
            }

            const responseData = await response.json();
            console.log("Parsed response data:", responseData);

            if (responseData.success) {
                // Set the user's authentication state and user_id in localStorage
                localStorage.setItem('isAuthenticated', 'true');
                if (responseData.data && responseData.data.user_id) {
                    localStorage.setItem('user_id', responseData.data.user_id.toString());
                } else {
                    console.error("Expected user_id in response data but it was not present.");
                }

                console.log("Login successful!");
                router.push(process.env.NEXT_PUBLIC_BASE_URL?.toString() || '/');
            } else {
                console.log("Login failed:", responseData.message || "No error message provided");
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return { handleSubmit };
};

export default useAuth;
