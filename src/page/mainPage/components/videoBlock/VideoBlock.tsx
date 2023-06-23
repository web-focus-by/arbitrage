import style from './VideoBlock.module.scss';
import classNames from 'classnames';
import BlockTitle from '../BlockTitles/BlockTitle';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper';
import React, { useCallback, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useAppSelector } from '../../../../store/hooks';
import { selectAllVideos } from '../../../../features/general/generalSelect';
import ArrowLeft from '../../../../../public/mainPage/videoBlock/ArrowLeft';
import ArrowRight from '../../../../../public/mainPage/videoBlock/ArrowRight';

const VideoBlock = () => {
  const { formatMessage } = useIntl();
  const sliderRef: React.MutableRefObject<SwiperRef | null> = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const videos = useAppSelector(selectAllVideos);

  return (
    <div className={style.spacing_between_blocks} id={'' + formatMessage({ id: 'video_headline_id' })}>
      <div className={classNames(style.mainPageContainer)}>
        <BlockTitle value={'' + formatMessage({ id: 'videoBlock.headline' })} />
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
          {videos.map((item, index) => (
            <SwiperSlide key={index} className={style.swiperItem}>
              <img src={item.image} alt={'preview'} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={style.navigationButtons}>
          <div onClick={handlePrev}>
            <ArrowLeft />
          </div>
          <div onClick={handleNext}>
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBlock;
