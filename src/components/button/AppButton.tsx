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
      classes={{ ...classes, root: classNames(classes?.root, style.wrapper) }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
