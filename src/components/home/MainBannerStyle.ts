import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 400px;
  position: relative;
`;
export const StyledSlide = styled(SwiperSlide)`
  background-color: #f5f5f5;
  text-align: center;
  border: 1px solid red;
  width: 50%;
  height: 100%;
  border-radius: 16px;
`;
