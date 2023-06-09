import { IconButton, Tooltip, TooltipProps } from '@mui/material';
import InfoIcon from '../icon/InfoIcon.tsx';
import style from './appTooltip.module.scss';
import { FC } from 'react';

const AppTooltip: FC<Omit<TooltipProps, 'children'>> = (prop) => {
  return (
    <Tooltip {...prop} arrow>
      <IconButton disableRipple={true} classes={{ root: style.icon }}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AppTooltip;
