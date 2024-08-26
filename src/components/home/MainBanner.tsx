import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';
import { StyledSwiper } from './MainBannerStyle';

const MainBanner = () => {
  return (
    <>
      <StyledSwiper
        modules={[Navigation, Pagination]}
        spaceBetween={32}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </StyledSwiper>
    </>
  );
};

export default MainBanner;
