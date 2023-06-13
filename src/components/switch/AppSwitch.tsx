import Switch, { SwitchProps } from '@mui/material/Switch';
import { FC, useEffect } from 'react';
import classNames from 'classnames';
import style from './AppSwitch.module.scss';
import { FormControlLabel, FormControlLabelProps } from '@mui/material';

interface IAppSwitchProps {
  switchProps: SwitchProps;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control'>;
}

const AppSwitch: FC<IAppSwitchProps> = (props) => {
  const { switchProps, formControlLabelProps } = props;
  useEffect(() => {
    console.log(switchProps);
  }, [switchProps]);
  return (
    <FormControlLabel
      {...formControlLabelProps}
      classes={{ root: style.resetMargin }}
      control={
        <Switch
          {...switchProps}
          checked={switchProps.checked ?? (switchProps.value as boolean) ?? false}
          disableRipple={true}
          classes={{
            root: classNames(switchProps.classes?.root, style.root, style.resetPadding),
            switchBase: classNames(switchProps.classes?.switchBase, style.switchBase, style.resetPadding),
            thumb: classNames(switchProps.classes?.thumb, style.thumb, style.resetPadding),
            track: classNames(switchProps.classes?.track, style.track, style.resetPadding),
            checked: classNames(switchProps.classes?.checked, style.checked, style.checked),
            disabled: classNames(switchProps.classes?.disabled, style.disabled, style.disabled),
          }}
        />
      }
      label={
        formControlLabelProps?.label && (
          <span className={classNames(style.label, 'text2')}>{formControlLabelProps.label}</span>
        )
      }
    />
  );
};

export default AppSwitch;
