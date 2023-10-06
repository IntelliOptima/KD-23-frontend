import EventCards from '@/components/Landingpage/EventCards/EventCards'
import Footer from '@/components/Landingpage/Footer/Footer'
import Navbar from '@/components/Landingpage/Navbar/Navbar'
import NowPlaying from '@/components/Landingpage/NowPlaying/NowPlaying'
import DayTable from '@components/Landingpage/NowPlaying/Days/DayTable'
import Carousel from '@/components/Landingpage/Carousel/Carousel'
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard'
import EventCards from '@/components/EventCards/EventCards'



export default function Home() {
  return (
    <main>

        <Navbar />
        <div className="h-screen">
        <Carousel />
        <NowPlaying />
        <DayTable />
        <EventCards />
        
        <Footer />
        </div>
    </main>
  )
}