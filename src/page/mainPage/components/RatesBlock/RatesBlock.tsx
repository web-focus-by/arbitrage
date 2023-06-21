import style from './RatesBlock.module.scss';
import classNames from 'classnames';
import BlockTitle from '../BlockTitles/BlockTitle';
import { useIntl } from 'react-intl';
import AppButton from '../../../../components/button/AppButton';
import CheckIcon from '@mui/icons-material/Check';
import useWindow from '../../../../hooks/useWindow';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import React, { useCallback, useRef } from 'react';
import { Navigation } from 'swiper';
import videoArrowLeft from '../../../../../public/mainPage/videoBlock/ArrowLeft.svg';
import videoArrowRight from '../../../../../public/mainPage/videoBlock/ArrowRight.svg';

const dataRates = [
  {
    id: 1,
    ratesTerm: 'ratesBlock.term.week',
    ratesPrice: 'ratesBlock.price.week',
    ratesContentInterExchangeScanner: 'ratesBlock.content.inter.exchange.scanner',
    ratesContentInterExchangeTgBot: 'ratesBlock.content.inter.exchange.tg.bot',
    ratesContentUserChat: 'ratesBlock.content.user.chat',
    ratesContentIntraExchangeTgBot: '',
  },

  {
    id: 2,
    ratesTerm: 'ratesBlock.term.month',
    ratesPrice: 'ratesBlock.price.month',
    ratesContentInterExchangeScanner: 'ratesBlock.content.inter.exchange.scanner',
    ratesContentInterExchangeTgBot: 'ratesBlock.content.inter.exchange.tg.bot',
    ratesContentUserChat: 'ratesBlock.content.user.chat',
    ratesContentIntraExchangeTgBot: 'ratesBlock.content.intra.exchange.tg.bot',
  },

  {
    id: 3,
    ratesTerm: 'ratesBlock.term.forever',
    ratesPrice: 'ratesBlock.price.forever',
    ratesContentInterExchangeScanner: 'ratesBlock.content.inter.exchange.scanner',
    ratesContentInterExchangeTgBot: 'ratesBlock.content.inter.exchange.tg.bot',
    ratesContentUserChat: 'ratesBlock.content.user.chat',
    ratesContentIntraExchangeTgBot: 'ratesBlock.content.intra.exchange.tg.bot',
  },
];

const RatesBlock = () => {
  const { formatMessage } = useIntl();
  const { windowSize } = useWindow();
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
    <div id={'' + formatMessage({ id: 'ratesBlock.headline' })}>
      {windowSize.width > 1200 ? (
        <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
          <BlockTitle value={'' + formatMessage({ id: 'ratesBlock.headline' })} />
          <div className={style.ratesBlockContainer}>
            {dataRates.map((item) => (
              <div key={item.id} className={style.ratesBlockItem}>
                <h4 className={style.ratesTerm}>{formatMessage({ id: item.ratesTerm })}</h4>
                <div className={style.ratesBlockItemContent}>
                  <div>
                    <div className={classNames(style.ratesPrice, style.prise)}>
                      {formatMessage({ id: item.ratesPrice })}
                    </div>
                    <div className={classNames(style.ratesContentText, style.text)}>
                      <div className={style.ratesContent}>
                        <CheckIcon sx={{ color: '#3366CC' }} />
                        {formatMessage({ id: item.ratesContentInterExchangeScanner })}
                      </div>
                      <div className={style.ratesContent}>
                        <CheckIcon sx={{ color: '#3366CC' }} />
                        {formatMessage({ id: item.ratesContentInterExchangeTgBot })}
                      </div>
                      <div className={style.ratesContent}>
                        <CheckIcon sx={{ color: '#3366CC' }} />
                        {formatMessage({ id: item.ratesContentUserChat })}
                      </div>
                      {item.ratesContentIntraExchangeTgBot && (
                        <div className={style.ratesContent}>
                          <CheckIcon sx={{ color: '#3366CC' }} />
                          {formatMessage({ id: item.ratesContentIntraExchangeTgBot })}
                        </div>
                      )}
                    </div>
                  </div>

                  <AppButton color={'secondary'}>{formatMessage({ id: 'button.purchase' })}</AppButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={style.spacing_between_blocks}>
          <div className={style.mainPageContainer}>
            <BlockTitle value={'' + formatMessage({ id: 'ratesBlock.headline' })} />
          </div>
          <div className={classNames(style.ratesBlockContainer, style.MySwiperClass)}>
            <Swiper
              modules={[Navigation]}
              ref={sliderRef}
              breakpoints={{
                1024: {
                  slidesPerView: 'auto',
                  spaceBetween: '2%',
                },
                768: {
                  slidesPerView: 'auto',
                  spaceBetween: '3%',
                },
                320: {
                  slidesPerView: 'auto',
                  spaceBetween: '5%',
                },
              }}
            >
              {dataRates.map((item) => (
                <SwiperSlide className={style.swiperItem} key={item.id + '_swiper'}>
                  <div className={style.ratesBlockItem}>
                    <h4 className={style.ratesTerm}>{formatMessage({ id: item.ratesTerm })}</h4>
                    <div className={style.ratesBlockItemContent}>
                      <div>
                        <div className={classNames(style.ratesPrice, style.prise)}>
                          {formatMessage({ id: item.ratesPrice })}
                        </div>
                        <div className={classNames(style.ratesContentText, style.text)}>
                          <div className={style.ratesContent}>
                            <CheckIcon sx={{ color: '#3366CC' }} />
                            {formatMessage({ id: item.ratesContentInterExchangeScanner })}
                          </div>
                          <div className={style.ratesContent}>
                            <CheckIcon sx={{ color: '#3366CC' }} />
                            {formatMessage({ id: item.ratesContentInterExchangeTgBot })}
                          </div>
                          <div className={style.ratesContent}>
                            <CheckIcon sx={{ color: '#3366CC' }} />
                            {formatMessage({ id: item.ratesContentUserChat })}
                          </div>
                          {item.ratesContentIntraExchangeTgBot && (
                            <div className={style.ratesContent}>
                              <CheckIcon sx={{ color: '#3366CC' }} />
                              {formatMessage({ id: item.ratesContentIntraExchangeTgBot })}
                            </div>
                          )}
                        </div>
                      </div>

                      <AppButton color={'secondary'}>{formatMessage({ id: 'button.purchase' })}</AppButton>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
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
      )}
    </div>
  );
};

export default RatesBlock;
