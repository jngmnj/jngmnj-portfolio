import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Image from 'next/image';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { A11y, Autoplay, Navigation } from 'swiper/modules';
import { StyledSlide, StyledSwiper } from './ProjectSliderStyle';

const ProjectSlider = () => {
  return (
    <div>
      <StyledSwiper
        modules={[Navigation, A11y, Autoplay]}
        // spaceBetween={32}
        slidesPerView={1}
        navigation={{
          prevEl: '#custom-prev',
          nextEl: '#custom-next',
        }}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        autoplay={{ delay: 8000 }}
        loop={true}
        centeredSlides={true}
      >
        <StyledSlide>
          <Image
            src="/images/about/img_temp.png"
            alt="project"
            width={300}
            height={200}
            className="size-full object-cover"
          />
        </StyledSlide>
        <StyledSlide>
          <Image
            src="/images/about/img_temp.png"
            alt="project"
            width={300}
            height={200}
            className="size-full object-cover"
          />
        </StyledSlide>
        <StyledSlide>
          <Image
            src="/images/about/img_temp.png"
            alt="project"
            width={300}
            height={200}
            className="size-full object-cover"
          />
        </StyledSlide>
      </StyledSwiper>
      <div className="custom-navigation relative mt-4 flex justify-end gap-2">
        <button className="rounded-lg bg-seagull-500 p-2" id="custom-prev">
          <GoChevronLeft className="text-2xl text-white" />
        </button>
        <button className="rounded-lg bg-seagull-500 p-2" id="custom-next">
          <GoChevronRight className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProjectSlider;
