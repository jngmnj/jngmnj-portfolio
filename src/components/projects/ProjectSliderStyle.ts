import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';

export const StyledSwiper = styled(Swiper)`
  width: 600px;
  // height: 400px;
  position: relative;
  max-width: 100%;
`;
export const StyledSlide = styled(SwiperSlide)`
  text-align: center;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
