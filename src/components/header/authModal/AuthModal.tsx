import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import style from './authModal.module.scss';
import Login from '../../../features/auth/Login.tsx';
import Signup from '../../../features/auth/Signup.tsx';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

export enum EModalView {
  login = 'login',
  auth = 'auth',
}

const AuthModal = () => {
  const { formatMessage } = useIntl();
  const [value, setValue] = React.useState(EModalView.login);

  const handleChange = (event: React.SyntheticEvent, newValue: EModalView) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        // indicatorColor="inherit"
        aria-label="secondary tabs example"
        // TabIndicatorProps={{
        //   style: {
        //     backgroundColor: '#D97D54',
        //   },
        // }}
        classes={{
          indicator: style.selectedTab,
          root: style.tabs,
          flexContainer: classNames(style.container, style.container__padding),
        }}
      >
        <Tab
          value={EModalView.login}
          label={<h4>{formatMessage({ id: 'modal.login' })}</h4>}
          classes={{ selected: style.selectedTabText, root: style.tab }}
          disableRipple={true}
        />
        <Tab
          value={EModalView.auth}
          label={<h4>{formatMessage({ id: 'modal.auth' })}</h4>}
          classes={{ selected: style.selectedTabText, root: style.tab }}
          disableRipple={true}
        />
      </Tabs>
      <TabPanel value={value} index={EModalView.login}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={EModalView.auth}>
        <Signup />
      </TabPanel>
    </Box>
  );
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className={style.container__padding}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default AuthModal;
