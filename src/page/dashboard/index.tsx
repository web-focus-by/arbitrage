import Header from '../../components/header/Header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import style from './style.module.scss';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import useWindow from '../../hooks/useWindow.ts';
import FilterDashboard from './components/filter/FilterDashboard.tsx';
import TableDashboard from './components/table/TableDashboard.tsx';

const Dashboard = () => {
  const { formatMessage } = useIntl();
  const { windowSize } = useWindow();

  return (
    <>
      <Header />
      <div className={classNames(style.container, style.containerPadding)}>
        <div className={style.wrapper}>
          <h3 className={classNames({ h1: windowSize.width < 1200 })}>{formatMessage({ id: 'dashboard.title' })}</h3>
          <FilterDashboard />
          <TableDashboard />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
