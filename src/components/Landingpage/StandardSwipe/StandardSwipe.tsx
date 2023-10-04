import {FC} from 'react';
import Image from 'next/image'

interface SwiperCardProps{
    image: string;
    title: string;
    alt: string;
}


const StandardSwipe: FC<SwiperCardProps> = (props: SwiperCardProps) =>{
    return (<div>
        <Image
    
        priority
        src={props.image}
        alt={props.alt}
        >
            
        </Image>
    </div>
    )
}

export default StandardSwipe;