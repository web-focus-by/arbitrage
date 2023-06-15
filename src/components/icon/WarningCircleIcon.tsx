import { SvgIcon, SvgIconProps } from '@mui/material';

function WarningCircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="#3366CC"
        strokeWidth="1.2"
        strokeMiterlimit="10"
      />
      <path d="M12 7.5V12.75" stroke="#3366CC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12 17.25C12.6213 17.25 13.125 16.7463 13.125 16.125C13.125 15.5037 12.6213 15 12 15C11.3787 15 10.875 15.5037 10.875 16.125C10.875 16.7463 11.3787 17.25 12 17.25Z"
        fill="#3366CC"
      />
    </SvgIcon>
  );
}

export default WarningCircleIcon;
