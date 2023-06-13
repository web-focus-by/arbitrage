import style from './VideoBlock.module.scss';
import classNames from 'classnames';
import BlockTitle from '../BlockTitles/BlockTitle';
import videoImage from '../../../../../public/mainPage/videoBlock/videoImage.png';
import videoArrowLeft from '../../../../../public/mainPage/videoBlock/ArrowLeft.svg';
import videoArrowRight from '../../../../../public/mainPage/videoBlock/ArrowRight.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper';
import React, { useCallback, useRef } from 'react';

const VideoBlock = () => {
  const sliderRef: React.MutableRefObject<SwiperRef | null> = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <div className={style.spacing_between_blocks}>
      <div className={classNames(style.mainPageContainer)}>
        <BlockTitle value={'Видео'} />
      </div>
      <div className={style.MySwiperClass}>
        <Swiper
          spaceBetween={'1%'}
          slidesPerView={'auto'}
          modules={[Navigation]}
          className={style.MySwiper}
          ref={sliderRef}
          breakpoints={{
            1367: {
              spaceBetween: '1%',
              slidesPerView: 'auto',
            },
            1024: {
              spaceBetween: '2%',
              slidesPerView: 'auto',
            },
            768: {
              spaceBetween: '3%',
              slidesPerView: 'auto',
            },
            320: {
              spaceBetween: '5%',
              slidesPerView: 'auto',
            },
          }}
        >
          <SwiperSlide className={style.swiperItem}>
            <img src={videoImage} />
          </SwiperSlide>
          <SwiperSlide className={style.swiperItem}>
            <img src={videoImage} />
          </SwiperSlide>
          <SwiperSlide className={style.swiperItem}>
            <img src={videoImage} />
          </SwiperSlide>
          <SwiperSlide className={style.swiperItem}>
            <img src={videoImage} />
          </SwiperSlide>
          <SwiperSlide className={style.swiperItem}>
            <img src={videoImage} />
          </SwiperSlide>
          <SwiperSlide className={style.swiperItem}>
            <img src={videoImage} />
          </SwiperSlide>
          <SwiperSlide className={style.swiperItem}>
            <img src={videoImage} />
          </SwiperSlide>
        </Swiper>
        <div className={style.navigationButtons}>
          <div onClick={handlePrev}>
            <img src={videoArrowLeft} />
          </div>
          <div onClick={handleNext}>
            <img src={videoArrowRight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBlock;
