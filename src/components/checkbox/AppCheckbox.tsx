import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import React, { FC } from 'react';
import classNames from 'classnames';
import style from './appCheckbox.module.scss';
import { FormControlLabel, FormControlLabelProps } from '@mui/material';
import AppTooltip from '../toollip/AppTooltip.tsx';

interface IFormControlLabelProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  label?: React.ReactNode | string;
  tooltip?: string | React.ReactNode;
}
interface ICheckboxProps {
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: IFormControlLabelProps;
}

const AppCheckbox: FC<ICheckboxProps> = ({ checkboxProps, formControlLabelProps }) => {
  return (
    <FormControlLabel
      {...formControlLabelProps}
      control={
        <Checkbox
          {...checkboxProps}
          checked={(checkboxProps?.value as boolean) ?? false}
          disableRipple={true}
          classes={{
            ...checkboxProps?.classes,
            root: classNames(checkboxProps?.classes?.root, style.checkbox),
            checked: classNames(checkboxProps?.classes?.checked, style.checkboxChecked),
            disabled: classNames(checkboxProps?.classes?.disabled, style.checkboxDisabled),
            indeterminate: classNames(checkboxProps?.classes?.indeterminate, style.checkboxIndeterminate),
          }}
          focusVisibleClassName={classNames(checkboxProps?.focusVisibleClassName, style.focused)}
        />
      }
      label={
        formControlLabelProps?.label && (
          <span className={classNames(style.label, 'text2')}>
            {formControlLabelProps.label}
            {formControlLabelProps.tooltip && <AppTooltip title={formControlLabelProps.tooltip} />}
          </span>
        )
      }
    />
  );
};

export default AppCheckbox;
