"use client";
import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

 const ActivePageContext = createContext("");

const ActivePageProvider = ({ children }: Props) => {

  const pathName = usePathname();
  return (
    <ActivePageContext.Provider value={pathName}>
      {children}
    </ActivePageContext.Provider>
  );
}

export const useActivePage = () => {
    return useContext(ActivePageContext);
  }

export default ActivePageProvider;
