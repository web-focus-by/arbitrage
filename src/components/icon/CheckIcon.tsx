import { SvgIcon, SvgIconProps } from '@mui/material';

function CheckIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.5 6.75L9.5 17.25L4.5 12.0002"
        stroke="#B7B7B7"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

export default CheckIcon;
