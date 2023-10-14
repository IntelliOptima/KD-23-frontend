"use client";
import AdminNavbar from './AdminNavbar/AdminNavbar'
import AdminSidebar from './AdminSidebar/AdminSidebar'
import { useAdminSidebar } from '@/contexts/AdminSidebarContext';

type AdminDashboardProps = {
  children?: React.ReactNode;
};

const AdminPanel = ({ children }: AdminDashboardProps) => {

  const { sidebarOpen, setSidebarOpen } = useAdminSidebar();


  const openSidebar = () => {
    console.log("Sidebar toggle clicked");
    setSidebarOpen(!sidebarOpen);
  }
  return (
    localStorage.getItem("role") === "ADMIN" ? (
      <div className="flex flex-col">
        <AdminNavbar openSidebar={openSidebar} />
        <div className="flex">
          <AdminSidebar sidebarOpen={sidebarOpen} />
          <main
            className={`flex-grow p-4 transition-all duration-300 ease-in-out transform ${sidebarOpen ? 'ml-[250px]' : 'ml-0'
              }`}
          >
            {children}
          </main>
        </div>
      </div>
    ) : (
      <div>
        <h1>Not authorized BYEBYE</h1>
      </div>
    )
  );
};

export default AdminPanel;