import Header from '../../components/header/Header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import style from './style.module.scss';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import useWindow from '../../hooks/useWindow.ts';
import FilterDashboard from './components/filter/FilterDashboard.tsx';
import TableDashboard from './components/table/TableDashboard.tsx';
import AppButton from '../../components/button/AppButton.tsx';
import Modal from '../../components/modal/Modal.tsx';
import { useState } from 'react';

const Dashboard = () => {
  const { formatMessage } = useIntl();
  const { windowSize } = useWindow();
  const [isOpen, setIsOpen] = useState(false);

  const closeModalHandler = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Header />
      <div className={classNames(style.container, style.containerPadding)}>
        <div className={style.wrapper}>
          <h3 className={classNames({ h1: windowSize.width < 1200 })}>{formatMessage({ id: 'dashboard.title' })}</h3>
          {windowSize.width > 991 ? (
            <FilterDashboard closeModalHandler={closeModalHandler} />
          ) : (
            <div className={style.filterButton}>
              <AppButton
                classes={{ root: style.btnPadding }}
                color={'secondary'}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                {formatMessage({ id: 'filter' })}
              </AppButton>
            </div>
          )}
          <TableDashboard />
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={<FilterDashboard closeModalHandler={closeModalHandler} />}
        classNames={style.modalWrapper}
      />
    </>
  );
};

export default Dashboard;
