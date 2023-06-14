import BellIcon from '../../icon/BellIcon.tsx';
import { Avatar, IconButton, Menu } from '@mui/material';
import style from './authBlock.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, MouseEvent } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../../services/auth.ts';
import { logout as logoutAction } from '../../../features/auth/authSlice.ts';
import { useAppDispatch } from '../../../store/hooks.ts';
import classNames from 'classnames';
import useWindow from '../../../hooks/useWindow.ts';

const AuthBlock = () => {
  const { windowSize } = useWindow();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (rout: string | object) => {
    if (rout && typeof rout === 'string') {
      navigate('/' + rout);
    }
    setAnchorElUser(null);
  };

  const logoutHandler = async () => {
    try {
      await logout();
      dispatch(logoutAction());
    } catch (e) {
      //TODO вынести ошибку в тост
    }
  };

  return (
    <div className={style.wrapper}>
      <BellIcon className={style.icon} />
      <Avatar classes={{ root: style.avatar }} />
      <IconButton onClick={handleOpenUserMenu} disableRipple={true} classes={{ root: style.arrowWrapper }}>
        {anchorElUser ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        id="menu-appbar"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        classes={{
          paper: style.menu,
          list: style.list,
        }}
      >
        <MenuItem
          classes={{
            root: classNames(style.menuItem, 'text', { ['text2']: windowSize.width < 1366 }),
          }}
          onClick={() => {
            handleCloseUserMenu('profile');
          }}
        >
          {formatMessage({ id: 'profile' })}
        </MenuItem>
        <MenuItem
          classes={{
            root: classNames(style.menuItem, 'text'),
          }}
          onClick={() => {
            handleCloseUserMenu('dashboard');
          }}
        >
          {formatMessage({ id: 'scaner' })}
        </MenuItem>
        <MenuItem
          classes={{
            root: classNames(style.menuItem, style.logout, 'text'),
          }}
          onClick={logoutHandler}
        >
          {formatMessage({ id: 'logout' })}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AuthBlock;
