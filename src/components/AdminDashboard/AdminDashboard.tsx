"use client";
import React from 'react'
import AdminDashboardNavbar from './AdminDashboardNavbar/AdminDashboardNavbar'
import AdminDashboardSidebar from './AdminDashboardSidebar/AdminDashboardSidebar'

type AdminDashboardProps = {
  children?: React.ReactNode;
};

const AdminDashboard = ({ children }: AdminDashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const openSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <AdminDashboardNavbar openSidebar={openSidebar} />

      <div className="flex">
        <AdminDashboardSidebar sidebarOpen={sidebarOpen} />
        <main
          className={`flex-grow p-4 transition-transform ${
            sidebarOpen ? 'ml-[250px]' : 'ml-0'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;