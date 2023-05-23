import { FC } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import { Link } from '@mui/material';

const AppLink: FC<RouterLinkProps & LinkProps> = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Link {...otherProps} component={RouterLink} to={props.to}>
      {children}
    </Link>
  );
};

AppLink.defaultProps = {
  to: '/',
};

export default AppLink;
