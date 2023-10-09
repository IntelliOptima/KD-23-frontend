import { FC } from 'react';
import Image from 'next/image';

interface SwiperCardProps {
    image: string;
    title: string;
    alt: string;
}


const StandardSwipe: FC<SwiperCardProps> = (props: SwiperCardProps) => {
    return (
    <div>
        <div className='absolute left-20 top-20 font-inter text-2xl italic font-medium text-white outline-black'>
            KinoXP represents:</div>
        <div className='absolute left-20 top-40 text-white font-inter text-7xl italic font-black'>
            {props.title}</div>
        <Image
            priority
            src={props.image}
            alt={props.alt}
        />

        <button className=' absolute left-20 top-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded'>
            Buy tickets
        </button>
    </div>
    )
}

export default StandardSwipe;