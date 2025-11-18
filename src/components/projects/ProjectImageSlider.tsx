'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ImageSwiper from './swiper/ImageSwiper';
import SwiperNavigationButtons from './swiper/SwiperNavigationButtons';

interface ProjectImageSliderProps {
  images: string[];
  projectTitle: string;
  onImageClick?: (index: number) => void;
}

export default function ProjectImageSlider({
  images,
  projectTitle,
  onImageClick,
}: ProjectImageSliderProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <ImageSwiper
        images={images}
        projectTitle={projectTitle}
        onImageClick={onImageClick}
        navigation={{
          prevEl: '#image-slider-prev',
          nextEl: '#image-slider-next',
        }}
        slidesPerView={{
          0: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
        mode="thumbnail"
      />

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <SwiperNavigationButtons
          prevButtonId="image-slider-prev"
          nextButtonId="image-slider-next"
          variant="default"
        />
      )}
    </div>
  );
}
