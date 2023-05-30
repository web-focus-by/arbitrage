import Switch, { SwitchProps } from '@mui/material/Switch';
import { FC } from 'react';
import classNames from 'classnames';
import style from './AppSwitch.module.scss';

type IAppSwitch = SwitchProps;
const AppSwitch: FC<IAppSwitch> = (props) => {
  return (
    <Switch
      {...props}
      disableRipple={true}
      classes={{
        root: classNames(props.classes?.root, style.root, style.resetPadding),
        switchBase: classNames(props.classes?.switchBase, style.switchBase, style.resetPadding),
        thumb: classNames(props.classes?.thumb, style.thumb, style.resetPadding),
        track: classNames(props.classes?.track, style.track, style.resetPadding),
        checked: classNames(props.classes?.checked, style.checked, style.checked),
        disabled: classNames(props.classes?.disabled, style.disabled, style.disabled),
      }}
    />
  );
};

export default AppSwitch;
