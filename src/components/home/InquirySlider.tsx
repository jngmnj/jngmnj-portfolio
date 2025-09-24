'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Autoplay } from 'swiper/modules';
import { StyledSlide, StyledSwiper } from './InquirySliderStyle';

const InquirySlider = () => {
  return (
    <>
      <StyledSwiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1}
        draggable={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        centeredSlides={true}
        direction="vertical"
      >
        <StyledSlide>토스</StyledSlide>
        <StyledSlide>카카오</StyledSlide>
        <StyledSlide>네이버</StyledSlide>
        <StyledSlide>쿠팡</StyledSlide>
        <StyledSlide>우아한형제들</StyledSlide>
      </StyledSwiper>
    </>
  );
};

export default InquirySlider;
