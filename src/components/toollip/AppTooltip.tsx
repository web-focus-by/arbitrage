import { IconButton, Tooltip, TooltipProps } from '@mui/material';
import InfoIcon from '../icon/InfoIcon.tsx';
import style from './appTooltip.module.scss';
import { FC } from 'react';

type AppTooltipProps = Omit<TooltipProps, 'children'>;
const AppTooltip: FC<AppTooltipProps> = (prop) => {
  return (
    <Tooltip {...prop} arrow>
      <IconButton disableRipple={true} classes={{ root: style.icon }}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AppTooltip;
