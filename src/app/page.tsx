import EventCards from '@/components/Landingpage/EventCards/EventCards'
import Footer from '@/components/Landingpage/Footer/Footer'
import Navbar from '@/components/Landingpage/Navbar/Navbar'


export default function Home() {
  return (
    <main>
        <Navbar />
        <div className="h-screen">

        <EventCards />
        </div>
        <Footer />
    </main>
  )
}
