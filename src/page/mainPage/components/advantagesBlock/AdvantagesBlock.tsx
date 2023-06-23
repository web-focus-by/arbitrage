import style from './AdvantagesBlock.module.scss';
import classNames from 'classnames';
import BlockTitle from '../BlockTitles/BlockTitle';
import { useIntl } from 'react-intl';
import ImgLinksBetweenExchanges from '../../../../../public/mainPage/advantages/ImgLinksBetweenExchanges';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import SearchIcon from '@mui/icons-material/Search';
import ImgConvenientFilters from '../../../../../public/mainPage/advantages/ImgConvenientFilters';
import ImgCalcTransactionAmount from '../../../../../public/mainPage/advantages/ImgCalcTransactionAmount';
import ImgCommissionAccounting from '../../../../../public/mainPage/advantages/ImgCommissionAccountong';
import ImgHedging from '../../../../../public/mainPage/advantages/ImgHedging';
import ImgSpreadAlerts from '../../../../../public/mainPage/advantages/ImgSpreadAlerts';
import ImgCoinTransferTime from '../../../../../public/mainPage/advantages/ImgCoinTransferTime';
import { Navigation } from 'swiper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import React, { useCallback, useRef } from 'react';
import useWindow from '../../../../hooks/useWindow';
import ArrowLeft from '../../../../../public/mainPage/videoBlock/ArrowLeft';
import ArrowRight from '../../../../../public/mainPage/videoBlock/ArrowRight';

const dataAdvantages = [
  {
    id: 1,
    adv_headline: 'advHeadline.links.between.exchanges',
    adv_descr: 'advDescr.links.between.exchanges',
    adv_img: <ImgLinksBetweenExchanges viewBox="0 0 32 32" sx={{ fill: 'none', fontSize: 32 }} />,
  },

  {
    id: 2,
    adv_headline: 'advHeadline.convenient.filters',
    adv_descr: 'advDescr.convenient.filters',
    adv_img: <ImgConvenientFilters viewBox="0 0 32 32" sx={{ fill: 'none', fontSize: 32 }} />,
  },

  {
    id: 3,
    adv_headline: 'advHeadline.quick.update.spreads',
    adv_descr: 'advDescr.quick.update.spreads',
    adv_img: <QueryBuilderIcon sx={{ fontSize: 32, color: '#3366CC' }} />,
  },

  {
    id: 4,
    adv_headline: 'advHeadline.calc.transaction.amount',
    adv_descr: 'advDescr.calc.transaction.amount',
    adv_img: <ImgCalcTransactionAmount viewBox="0 0 32 32" sx={{ fill: 'none', fontSize: 32 }} />,
  },

  {
    id: 5,
    adv_headline: 'advHeadline.check.output.networks',
    adv_descr: 'advDescr.check.output.networks',
    adv_img: <SearchIcon sx={{ fontSize: 32, color: '#3366CC' }} />,
  },

  {
    id: 6,
    adv_headline: 'advHeadline.commission.accounting',
    adv_descr: 'advDescr.commission.accounting',
    adv_img: <ImgCommissionAccounting viewBox="0 0 32 32" sx={{ fill: 'none', fontSize: 32 }} />,
  },

  {
    id: 7,
    adv_headline: 'advHeadline.hedging',
    adv_descr: 'advDescr.hedging',
    adv_img: <ImgHedging viewBox="0 0 32 32" sx={{ fill: 'none', fontSize: 32 }} />,
  },

  {
    id: 8,
    adv_headline: 'advHeadline.spread.alerts',
    adv_descr: 'advDescr.spread.alerts',
    adv_img: <ImgSpreadAlerts viewBox="0 0 32 32" sx={{ fill: 'none', fontSize: 32 }} />,
  },

  {
    id: 9,
    adv_headline: 'advHeadline.coin.transfer.time',
    adv_descr: 'advDescr.coin.transfer.time',
    adv_img: <ImgCoinTransferTime viewBox="0 0 32 32" sx={{ fill: 'none', fontSize: 32 }} />,
  },
];

const AdvantagesBlock = () => {
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

  const { windowSize } = useWindow();

  return (
    <div id={'' + formatMessage({ id: 'adv_headline_id' })}>
      {windowSize.width > 1200 ? (
        <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)}>
          <BlockTitle value={'' + formatMessage({ id: 'adv_headline' })} />
          <div className={style.advantages_container}>
            {dataAdvantages.map((item) => (
              <div key={item.id} className={style.advantage_block}>
                <div className={style.advantage_block_text}>
                  <div className={style.subtitle1}>{formatMessage({ id: item.adv_headline })}</div>
                  <div className={classNames(style.text, style.textGrayColor)}>
                    {formatMessage({ id: item.adv_descr })}
                  </div>
                </div>
                <div>{item.adv_img}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={style.spacing_between_blocks}>
          <div className={style.mainPageContainer}>
            <BlockTitle value={'' + formatMessage({ id: 'adv_headline' })} />
          </div>
          <div className={style.MySwiperClass}>
            <Swiper
              modules={[Navigation]}
              className={style.MySwiper}
              ref={sliderRef}
              breakpoints={{
                1200: {
                  spaceBetween: '1%',
                  slidesPerView: 'auto',
                },
                768: {
                  spaceBetween: '2%',
                  slidesPerView: 'auto',
                },
                120: {
                  spaceBetween: '5%',
                  slidesPerView: 'auto',
                },
              }}
            >
              {dataAdvantages.map((item) => (
                <SwiperSlide className={style.swiperItem} key={'swiperSlide_' + item.id}>
                  <div className={style.advantages_container}>
                    <div key={item.id} className={style.advantage_block}>
                      <div className={style.advantage_block_text}>
                        <div className={style.subtitle1}>{formatMessage({ id: item.adv_headline })}</div>
                        <div className={style.text}>{formatMessage({ id: item.adv_descr })}</div>
                      </div>
                      <div>{item.adv_img}</div>
                    </div>
                  </div>
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
      )}
    </div>
  );
};

export default AdvantagesBlock;
