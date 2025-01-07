import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { StyledSlide, StyledSwiper } from './MainBannerStyle';

const MainBanner = () => {
  return (
    <div className="relative">
      <StyledSwiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={32}
        slidesPerView={'auto'}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
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
      <div className="absolute left-1/2 top-1/2 z-10 w-1/2 -translate-x-1/2 -translate-y-1/2">
        <button className="swiper-button-prev px-4 py-2 !text-seagull-500">
          <p className="sr-only">Prev</p>
        </button>
        <button className="swiper-button-next px-4 py-2 !text-seagull-500">
          <p className="sr-only">Next</p>
        </button>
      </div>
    </div>
  );
};

export default MainBanner;
