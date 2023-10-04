import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
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
                    <div>
                        <button className="btn-primary">Sign Up</button>
                    </div>
                    <div>
                        <a href="/" className="text-white text-xl">Login</a>
                    </div>
                </div>

            </div>
        </nav>

    )
}

export default Navbar