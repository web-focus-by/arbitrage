import { SvgIcon, SvgIconProps } from '@mui/material';

function ImgHedging(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M25 7L7 25" stroke="#3366CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 9H14" stroke="#3366CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 4V14" stroke="#3366CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 23H28" stroke="#3366CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

export default ImgHedging;
