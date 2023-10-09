"use client";
import { useState, createContext ,useContext } from "react";

const AdminSidebarContext = createContext({
    sidebarOpen: false,
    setSidebarOpen: (value: boolean) => {}
});


const AdminSidebarProvider = ({ children }: any) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <AdminSidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
            {children}
        </AdminSidebarContext.Provider>
    );
};

export const useAdminSidebar = () => useContext(AdminSidebarContext);

export default AdminSidebarProvider;