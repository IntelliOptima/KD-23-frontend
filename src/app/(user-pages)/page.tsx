import NowPlaying from '@/components/NowPlaying/NowPlaying'
import DayTable from '@components/NowPlaying/Days/DayTable'
import Carousel from '@/components/Carousel/Carousel'
import EventCards from '@/components/EventCards/EventCards'



export default function Home() {
  return (
    <div >
        <Carousel />
        <NowPlaying />
        <DayTable />
        <EventCards />
    </div>
  );
}