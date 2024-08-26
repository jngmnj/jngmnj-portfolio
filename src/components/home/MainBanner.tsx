import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { StyledSlide, StyledSwiper } from './MainBannerStyle';

const MainBanner = () => {
  return (
    <>
      <StyledSwiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={32}
        slidesPerView={'auto'}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        centeredSlides={true}
      >
        <StyledSlide>Slide 1</StyledSlide>
        <StyledSlide>Slide 2</StyledSlide>
        <StyledSlide>Slide 3</StyledSlide>
        <StyledSlide>Slide 4</StyledSlide>
        <StyledSlide>Slide 5</StyledSlide>
      </StyledSwiper>
    </>
  );
};

export default MainBanner;
