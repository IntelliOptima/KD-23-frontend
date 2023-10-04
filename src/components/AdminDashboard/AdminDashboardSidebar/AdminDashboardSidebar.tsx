import Link from 'next/link'
import React from 'react'

const AdminDashboardSidebar = () => {
  return (
    <div>
        <div className="flex flex-col items-center pt-10 w-[250px] h-screen bg-[#232323]">
            <div className="w-full h-full">
                <ul className="flex flex-col ml-20 justify-between h-2/5 text-white leading-loose">
                    <Link href="/"><li className="hover:scale-105" >Dashboard</li></Link>
                    <Link href="/"><li className="hover:scale-105" >Program</li></Link>
                    <Link href="/"><li className="hover:scale-105" >Statistics</li></Link>
                    <Link href="/"><li className="hover:scale-105" >Employees</li></Link>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboardSidebar