import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { FC } from 'react';
import classNames from 'classnames';
import style from './appCheckbox.module.scss';
import { FormControlLabel, FormControlLabelProps } from '@mui/material';

interface ICheckboxProps {
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control'>;
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
          <span className={classNames(style.label, 'text2')}>{formControlLabelProps.label}</span>
        )
      }
    />
  );
};

export default AppCheckbox;
