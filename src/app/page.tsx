import EventCards from '@/components/Landingpage/EventCards/EventCards'
import Footer from '@/components/Landingpage/Footer/Footer'
import Navbar from '@/components/Landingpage/Navbar/Navbar'
import NowPlaying from '@/components/Landingpage/NowPlaying/NowPlaying'
import DayTable from '@components/Landingpage/NowPlaying/Days/DayTable'

export default function Home() {
  return (
    <main>
        <Navbar />
        <div className="h-screen">
        <NowPlaying />
        <DayTable />
        <EventCards />
        </div>
        <Footer />
    </main>
  )
}
