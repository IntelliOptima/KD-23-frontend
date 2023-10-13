import Link from 'next/link'
import React from 'react'

type AdminSidebarProps = {
  sidebarOpen: boolean;
};

const AdminSidebar = ({ sidebarOpen }: AdminSidebarProps) => {
  return (

    <div
    className={`fixed top-0 h-full w-[250px] bg-[#232323] transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="w-full h-full">
        <ul className="flex flex-col ml-20 pt-20 justify-between h-2/5 text-white leading-loose">
          <Link href="/admin/dashboard">
            <li className="hover:scale-105">Dashboard</li>
          </Link>
          <Link href="/admin/dashboard">
            <li className="hover:scale-105">Program</li>
          </Link>
          <Link href="/admin/dashboard">
            <li className="hover:scale-105">Statistics</li>
          </Link>
          <Link href="/admin/dashboard">
            <li className="hover:scale-105">Employees</li>
          </Link>
        </ul>
      </div>
    </div>

  );
};

export default AdminSidebar
