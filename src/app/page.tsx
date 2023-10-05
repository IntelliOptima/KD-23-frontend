import AdminDashboard from '@/components/AdminDashboard/AdminDashboard'
import EventCards from '@/components/Landingpage/EventCards/EventCards'



export default function Home() {
  return (
    <main className="bg-white">
      <AdminDashboard>
        
          <EventCards />
          <EventCards />
          <EventCards />
      
      </AdminDashboard>
    </main >

  )
}
