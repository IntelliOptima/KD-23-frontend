"use client";

import React from 'react'

const TestFetch = () => {

    const handleClick = async () => {
        const response = await fetch('http://localhost:8080/cinema/get-all-cinemas',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            
        })
        const data = await response.json()
        if (response.ok) {
            console.log(data)
        } else {
            console.log('error')
        
    }
        
    }

  return (
    <div>
        <button onClick={handleClick}>Click</button>
    </div>
  )
}

export default TestFetch