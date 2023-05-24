import { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import classNames from 'classnames';
import style from './appTextField.module.scss';

const AppTextField: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      classes={{ ...props.classes, root: classNames(props.classes?.root, style.wrapper) }}
      InputProps={{
        ...props.InputProps,
        classes: {
          ...props.InputProps?.classes,
          input: classNames(props.InputProps?.classes?.input, style.input),
        },
        disableUnderline: true,
      }}
      InputLabelProps={{
        ...props.InputLabelProps,
        classes: {
          ...props.InputLabelProps?.classes,
          root: classNames(props.InputLabelProps?.classes?.root, style.label),
        },
        focused: false,
        shrink: true,
      }}
    />
  );
};

export default AppTextField;
