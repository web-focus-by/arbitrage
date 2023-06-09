import { FC } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import { Link } from '@mui/material';
import style from './appLink.module.scss';
import classNames from 'classnames';

const AppLink: FC<RouterLinkProps & LinkProps> = (props) => {
  const { children, classes, ...otherProps } = props;
  console.log(props.to);
  return (
    <Link
      {...otherProps}
      component={RouterLink}
      to={props.to}
      classes={{ ...classes, root: classNames(classes?.root, { [style.error]: otherProps.color === 'error' }) }}
    >
      {children}
    </Link>
  );
};

AppLink.defaultProps = {
  to: '/',
};

export default AppLink;
