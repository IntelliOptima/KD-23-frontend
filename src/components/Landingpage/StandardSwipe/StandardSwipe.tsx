import { FC } from 'react';
import Image from 'next/image'
import { relative } from 'path';
import Button from '@components/Landingpage/StandardSwipe/Button/Button'

interface SwiperCardProps {
    image: string;
    title: string;
    alt: string;
}


const StandardSwipe: FC<SwiperCardProps> = (props: SwiperCardProps) => {
    return (<div className='relative'>
        <div className='absolute left-20 top-20 font-inter text-2xl italic font-medium text-white outline-black'>
            KinoXP represents:</div>
        <div className='absolute left-20 top-40 text-white font-inter text-7xl italic font-black'>
            {props.title}</div>
        <Image
            priority
            src={props.image}
            alt={props.alt}
        />

        <Button buttonText="Buy Ticket"/>
    </div>
    )
}

export default StandardSwipe;