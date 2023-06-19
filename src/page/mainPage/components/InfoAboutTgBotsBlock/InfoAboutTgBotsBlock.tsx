import style from './InfoAboutTgBotsBlock.module.scss';
import classNames from 'classnames';
import AppButton from '../../../../components/button/AppButton';
import imgInfoAboutTgBotsBlock from '../../../../../public/mainPage/InfoAboutTgBotsBlockImg.png';
import { useIntl } from 'react-intl';

const InfoAboutTgBotsBlock = () => {
  const { formatMessage } = useIntl();
  return (
    <div className={classNames(style.mainPageContainer, style.spacing_between_blocks)} id={'Сканер'}>
      <div className={style.InfoAboutTgBotsBlockContainer}>
        <div className={style.InfoAboutTgBotsBlockText}>
          <h3>{formatMessage({ id: 'infoAboutTgBotsBlock.text' })}</h3>
          <AppButton color={'primary'}>{formatMessage({ id: 'button.go.over' })}</AppButton>
        </div>
        <div className={style.InfoAboutTgBotsBlockImg}>
          <img src={imgInfoAboutTgBotsBlock} />
        </div>
      </div>
    </div>
  );
};

export default InfoAboutTgBotsBlock;
