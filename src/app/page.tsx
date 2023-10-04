import EventCards from '@/components/Landingpage/EventCards/EventCards'
import Footer from '@/components/Landingpage/Footer/Footer'
import Navbar from '@/components/Landingpage/Navbar/Navbar'
import Carousel from '@/components/Landingpage/Carousel/Carousel'



export default function Home() {
  return (
    <main>

        <Navbar />
        <div className="h-screen">
        <Carousel />
        <EventCards />
        </div>
        <Footer />

    </main>
  )
}