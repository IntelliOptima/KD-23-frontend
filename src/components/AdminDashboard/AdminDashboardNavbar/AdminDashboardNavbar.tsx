"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type AdminDashboardNavbarProps = {
    openSidebar: () => void;
    };

const AdminDashboardNavbar = ({ openSidebar } : AdminDashboardNavbarProps) => {
    return (
        <nav className="bg-[#232323] p-2 flex flex-row items-center justify-between">
        
            <div className="flex items-center ml-[270px]">

                <Image 
                src="/menu-icon.png"
                height={20}
                width={20}
                alt="menu icon"
                onClick={openSidebar}
                className="cursor-pointer hover:scale-105"
                />

                <Link
                href="/">
                <Image
                src="/kinoxp-logo-text.png"
                width={200}
                height={80}
                alt="logo"
                className="ml-10"
                />
                </Link>
            </div>
            <div className="mr-10 flex items-center">
                <Link href="/">
                <Image 
                src="/profile-icon.png"
                height={40}
                width={40}
                alt="profile icon"
                />
                </Link> 
                <p className="text-white ml-4">User</p>
                
            </div>
        </nav >
    )
}

export default AdminDashboardNavbar