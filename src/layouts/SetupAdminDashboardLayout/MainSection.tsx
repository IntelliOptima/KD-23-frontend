import AdminDashboard from '@/components/AdminDashboard/AdminDashboard'
import EventCards from '@/components/Landingpage/EventCards/EventCards'
import React from 'react'

const HeroSection = () => {
  return (
    <div>
      <AdminDashboard>
        <main>
          <EventCards />
          <EventCards />
          <EventCards />
        </main>
      </AdminDashboard>
    </div>
  )
}

export default HeroSection