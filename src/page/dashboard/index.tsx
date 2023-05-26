import Header from '../../components/header/Header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import style from './style.module.scss';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import useWindow from '../../hooks/useWindow.ts';
import FilterDashboard from './components/filter/FilterDashboard.tsx';

const Dashboard = () => {
  const { formatMessage } = useIntl();
  const { windowSize } = useWindow();

  return (
    <>
      <Header />
      <div className={'container'}>
        <div className={style.wrapper}>
          <h3 className={classNames({ h1: windowSize.width < 1200 })}>{formatMessage({ id: 'dashboard.title' })}</h3>
          <FilterDashboard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
