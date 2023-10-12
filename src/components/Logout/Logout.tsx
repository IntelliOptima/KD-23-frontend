import React from 'react'

const Logout = () => {


    function logOutLocalStorage() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "false";
        console.log("isLoggedIn:", isLoggedIn);
    }

        console.log("Logout route hit. Forwarding to backend.");
        logOutLocalStorage();

        const handleLoad = async () => {
            const isLoggedIn = localStorage.getItem("isLoggedIn") === "false";
            console.log("isLoggedIn:", isLoggedIn);
            
            try{
                await fetch("localhost:8080/logout", {
                method: 'POST',
                
                credentials: "include",
            });}
    
            catch (error: any) {
                console.error('Error in logout route:', error.message || error);
            }
        }

  return (
    <div onLoad={handleLoad}>
        
    </div>
  )
}

export default Logout