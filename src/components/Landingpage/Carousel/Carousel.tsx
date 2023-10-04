"use client"
import { log } from 'console';
import Image from 'next/image';
import { Navigation } from "swiper/modules";
import React, { useRef } from 'react';
import CarouselImageList from '../../../../public/assets/CarouselImageList';
import { Swiper, SwiperSlide } from 'swiper/react'
import StandardSwipe from '../StandardSwipe/StandardSwipe';
import "swiper/css";
import "swiper/css/navigation";



//const slides = [pic1,pic2,pic3,pic4];
const Carousel = () => {
    return (
        <Swiper
            slidesPerView={1}
            rewind={true}
            
            navigation={true}
            modules={[Navigation]}
            onSlideChange={() => console.log("Slide changed")}
            onSwiper={swiper => console.log(swiper)}
        >
            <SwiperSlide>
                <StandardSwipe
                    image={CarouselImageList[0]}
                    title='Film'
                    alt='Film2'
                ></StandardSwipe>
            </SwiperSlide>
            <SwiperSlide>
                <StandardSwipe
                    image={CarouselImageList[1]}
                    title='Film'
                    alt='Film2'
                ></StandardSwipe>
            </SwiperSlide>
            <SwiperSlide>
                <StandardSwipe
                    image={CarouselImageList[2]}
                    title='Film'
                    alt='Film2'
                ></StandardSwipe>
            </SwiperSlide>
            <SwiperSlide>
                <StandardSwipe
                    image={CarouselImageList[3]}
                    title='Film'
                    alt='Film2'
                ></StandardSwipe>
            </SwiperSlide>






        </Swiper>);
};

export default Carousel;