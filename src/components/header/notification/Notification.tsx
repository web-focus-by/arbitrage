import React, { MouseEvent, useMemo, useState } from 'react';
import { CircularProgress, IconButton, Menu } from '@mui/material';
import BellIcon from '../../icon/BellIcon.tsx';
import style from './notidication.module.scss';
import classNames from 'classnames';
import MenuItem from '@mui/material/MenuItem';
import {
  INotification,
  useGetNotificationsQuery,
  useReadNotificationMutation,
} from '../../../services/notification.ts';
import { useIntl } from 'react-intl';
import WarningCircleIcon from '../../icon/WarningCircleIcon.tsx';
import CheckIcon from '../../icon/CheckIcon.tsx';
import { getFormattedSpreadString } from './notification.ts';
import Modal from '../../modal/Modal.tsx';
import { useAppSelector } from '../../../store/hooks.ts';
import { selectAllMarkets } from '../../../features/general/generalSelect.ts';
import SpreadNotificationContent from './spreadNotificationContent/SpreadNotificationContent.tsx';

type Unit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

enum TIME_UNITS {
  SECOND = 1000,
  MINUTE = 60 * 1000,
  HOUR = 60 * 60 * 1000,
  DAY = 24 * 60 * 60 * 1000,
}
const descriptionLength = 40;

const Notification = () => {
  const { formatMessage, formatRelativeTime, formatDate, formatTime } = useIntl();
  const [anchorElNotification, setAnchorElNotification] = useState<null | HTMLElement>(null);
  const { data, isLoading } = useGetNotificationsQuery();
  const [readNotification] = useReadNotificationMutation();
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<null | INotification>(null);
  const markets = useAppSelector(selectAllMarkets);

  const handleOpenNotificationMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null);
  };

  const closeModalHandler = () => {
    setTimeout(() => {
      setModalData(null);
    }, 300);
  };

  const openModalHandler = async (item) => {
    setOpenModal(true);
    setModalData(item);

    try {
      if (!item.if_read) {
        await readNotification(item.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const newNotificationCount = useMemo(() => {
    if (!data) return 0;
    return data?.filter((item) => !item.if_read).length;
  }, [data]);

  return (
    <React.Fragment>
      <IconButton onClick={handleOpenNotificationMenu} disableRipple={true}>
        <BellIcon className={style.icon} />
      </IconButton>
      <Menu
        anchorEl={anchorElNotification}
        open={Boolean(anchorElNotification)}
        onClose={handleCloseNotificationMenu}
        classes={{ paper: style.notificationMenu }}
        keepMounted
        sx={{ mt: '45px' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {newNotificationCount > 0 && (
          <div className={classNames(style.notificationCount, 'text2')}>
            {formatMessage(
              { id: 'notification.new.count' },
              {
                count: newNotificationCount,
              },
            )}
          </div>
        )}
        <div className={style.notificationItemsWrapper}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            data?.map((item) => {
              const timeDiff = new Date(item.creation_date).getTime() - new Date().getTime();
              // const timeDiff = new Date().getTime() - new Date().getTime() - 1000 * 60 * 59;
              const [val, type] = getRelativeTimeOptions(timeDiff);
              return (
                <MenuItem key={item.id} classes={{ root: style.menuItem }} disableRipple={true}>
                  {item.if_read ? (
                    <CheckIcon className={style.isReadNotification} />
                  ) : (
                    <WarningCircleIcon className={style.isReadNotification} />
                  )}
                  <div className={style.notifyDescriptionBlock}>
                    <div className={'text2'}>{item.title}</div>
                    <div className={classNames('text2', style.notifyShortContent)}>
                      {item.ntype === 'spread'
                        ? getFormattedSpreadString(JSON.parse(item.content), markets)
                        : item.content.length > descriptionLength
                        ? item.content.slice(0, descriptionLength) + '...'
                        : item.content}
                    </div>
                    <div className={classNames(style.notifyTime)}>
                      <span className={'table-headline'}>
                        {type !== 'day'
                          ? formatRelativeTime(val as number, type as Unit, { numeric: 'auto' })
                          : formatDate(item.creation_date) + ' ' + formatTime(item.creation_date)}
                      </span>
                      <span
                        className={'table-link'}
                        onClick={() => {
                          openModalHandler(item);
                        }}
                      >
                        Подробнее
                      </span>
                    </div>
                  </div>
                </MenuItem>
              );
            })
          )}
        </div>
      </Menu>
      <Modal
        isOpen={openModal}
        setIsOpen={setOpenModal}
        callbackClose={closeModalHandler}
        customTextContainer={true}
        title={modalData?.ntype === 'spread' ? formatMessage({ id: 'notification.modal.title' }) : modalData?.title}
        text={
          modalData?.ntype === 'spread' ? (
            <SpreadNotificationContent data={JSON.parse(modalData.content)} />
          ) : (
            <div className={style.contentWrapper}>{modalData?.content}</div>
          )
        }
      />
    </React.Fragment>
  );
};

const getRelativeTimeOptions = (timeDiff = 0) => {
  const moduleTimeDiff = Math.abs(timeDiff);
  if (moduleTimeDiff < TIME_UNITS.MINUTE) {
    return [Math.floor(timeDiff / TIME_UNITS.SECOND), 'second'];
  } else if (moduleTimeDiff < TIME_UNITS.HOUR) {
    return [Math.floor(timeDiff / TIME_UNITS.MINUTE), 'minute'];
  } else if (moduleTimeDiff < TIME_UNITS.DAY) {
    return [Math.floor(timeDiff / TIME_UNITS.HOUR), 'hour'];
  }
  return [Math.floor(timeDiff / TIME_UNITS.DAY), 'day'];
};

export default Notification;
