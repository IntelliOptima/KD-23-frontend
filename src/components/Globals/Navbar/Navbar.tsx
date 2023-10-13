"use client";
import { useActivePage } from '@/contexts/ActivePageContext';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'


const Navbar = () => {
    const router = useRouter();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const activePage = useActivePage();

    const showNavbar = [
        "/",
        "/set-landingpage",
    ].includes(activePage);


    const handleLogout = async () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('role', '')
        try {
            await fetch("http://localhost:8080/logout", {
                method: 'POST',
                credentials: "include",
            });
        }

        catch (error: any) {
            console.error('Error in logout route:', error.message || error);
        }

        router.refresh();
    }


    console.log("activePage", activePage);
    return (
        showNavbar && (
            <nav className="border-b border-white">
                <div className="flex flex-row items-center justify-between py-4 lg:mx-20 md:mx-10 sm:mx-5">
                    <div>
                        <Link
                            href="/"
                        >
                            <Image
                                src="/kinoxp-logo-text.png"
                                height={80}
                                width={200}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        <a href='/register'>
                            <button className="btn-primary">Sign Up</button>
                        </a>
                        <div>
                            {
                                isLoggedIn && (<button onClick={handleLogout} className="text-white text-xl">Logout</button>)
                            }


                            <a href="/login" className="text-white text-xl">{isLoggedIn ? '' : 'Login'}</a>
                        </div>
                    </div>

                </div>
            </nav>

        )
    )
}

export default Navbar