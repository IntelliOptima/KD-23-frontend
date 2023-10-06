"use client"
import { Navigation } from "swiper/modules";
import React, { useRef } from 'react';
import CarouselImageList from '@/assets/CarouselImageList';
import { Swiper, SwiperSlide } from 'swiper/react'
import StandardSwipe from '@/components/Landingpage/StandardSwipe/StandardSwipe';
import "swiper/css";
import "swiper/css/navigation";

import 'swiper/swiper-bundle.css'; // Import Swiper styles




const Carousel = () => {
    return (

        <Swiper
            slidesPerView={1}
            rewind={true}
            navigation={true}
            modules={[Navigation]}
        >
            {CarouselImageList.map(([image, title, alt], index) => (
                <SwiperSlide key={index}>
                    <StandardSwipe
                        image={image}
                        title={title}
                        alt={alt} />
                </SwiperSlide>
            ))}


        </Swiper >);
};

export default Carousel;