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
      <main>
        <div className={style.wrapper}>
          <div className={classNames(style.container, style.containerPadding)}>
            <h3 className={classNames({ h1: windowSize.width < 1200 }, style.title)}>
              {formatMessage({ id: 'dashboard.title' })}
            </h3>
            <FilterDashboard />
          </div>
          <div className={classNames(style.container, style.containerPadding, style.tablePadding)}>
            <TableDashboard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
