import NowPlaying from '@/components/NowPlaying/NowPlaying'
import DayTable from '@components/NowPlaying/Days/DayTable'
import Carousel from '@/components/Carousel/Carousel'
import EventCards from '@/components/EventCards/EventCards'
import { Suspense } from 'react'




export default function Home() {
  return (
    <div >
        <Carousel />

        <Suspense fallback={<p>Loading weather...</p>}>
        <NowPlaying />
        </Suspense>

        <DayTable />
        <EventCards />
    </div> 
  );
}