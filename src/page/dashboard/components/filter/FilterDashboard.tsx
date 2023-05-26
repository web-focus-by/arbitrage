import style from './filterDashboard.module.scss';
import { useIntl } from 'react-intl';
import { useMemo } from 'react';
import classNames from 'classnames';
import AppCheckbox from '../../../../components/checkbox/AppCheckbox.tsx';
import useWindow from '../../../../hooks/useWindow.ts';

const FilterDashboard = () => {
  const { formatMessage } = useIntl();
  const { windowSize } = useWindow();
  const subtitleClass = useMemo(() => {
    if (windowSize.width < 1200) {
      return 'text2';
    }
    return 'subtitle3';
  }, [windowSize.width]);

  return (
    <form>
      <div className={style.rowWrapper}>
        <div className={'subtitle2'}>{formatMessage({ id: 'dashboard.select.subtitle' })}</div>
        <div>
          <div className={style.subRowWrapper}>
            <div className={classNames(subtitleClass)}>{formatMessage({ id: 'dashboard.select.buy' })}</div>
            <div>
              {/*<AppCheckbox checked={false} />*/}
              <AppCheckbox formControlLabelProps={{ label: 'someData' }} />
            </div>
          </div>
          <div className={style.subRowWrapper}>
            <div className={classNames(subtitleClass)}>{formatMessage({ id: 'dashboard.select.sell' })}</div>
            <div></div>
          </div>
        </div>
      </div>
      <div className={style.rowWrapper}>
        <div className={'subtitle2'}>{formatMessage({ id: 'dashboard.setting.subtitle' })}</div>

        <div></div>
      </div>
    </form>
  );
};

export default FilterDashboard;
