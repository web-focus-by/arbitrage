import style from './mainHeadline.module.scss';
import classNames from 'classnames';
import imgHeadline from '../../../../../public/imgHeadline.png';
import AppButton from '../../../../components/button/AppButton';
import { useIntl } from 'react-intl';

const MainHeadline = () => {
  const { formatMessage } = useIntl();
  return (
    <div className={classNames(style.mainPageContainer, style.container_headline, style.spacing_between_blocks)}>
      <div className={style.text_headline}>
        <h1>{formatMessage({ id: 'mainHeadline.headline' })}</h1>
        <div className={classNames(style.main_headline_second_text, style.text, style.textGrayColor)}>
          {formatMessage({ id: 'mainHeadline.text' })}
        </div>
        <div className={style.main_headline_button}>
          <AppButton color={'primary'}>{formatMessage({ id: 'button.choose.tariff' })}</AppButton>
        </div>
      </div>
      <div className={style.img_headline}>
        <img src={imgHeadline} />
      </div>
    </div>
  );
};

export default MainHeadline;
