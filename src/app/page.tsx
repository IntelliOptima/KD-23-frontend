import EventCards from '@/components/Landingpage/EventCards/EventCards'
import Footer from '@/components/Landingpage/Footer/Footer'
import Navbar from '@/components/Landingpage/Navbar/Navbar'
import NowPlaying from '@/components/Landingpage/NowPlaying/NowPlaying'
import Day from '@components/Landingpage/NowPlaying/Days/Day'

export default function Home() {
  return (
    <main>
        <Navbar />
        <div className="h-screen">
        <NowPlaying />
        <Day />
        <EventCards />
        </div>
        <Footer />
    </main>
  )
}
