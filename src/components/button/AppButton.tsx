import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import classNames from 'classnames';
import style from './appButton.module.scss';

const AppButton: FC<ButtonProps> = (props) => {
  const { children, classes, ...otherProps } = props;
  return (
    <Button
      {...otherProps}
      disableRipple={true}
      classes={{
        ...classes,
        root: classNames(classes?.root, style.wrapper, 'button-text'),
        textSecondary: classNames(classes?.textSecondary, style.secondary),
        textPrimary: classNames(classes?.textPrimary, style.primary),
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
