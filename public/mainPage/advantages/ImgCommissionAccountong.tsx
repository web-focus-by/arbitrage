import { SvgIcon, SvgIconProps } from '@mui/material';

function ImgCommissionAccounting(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M25 7L7 25" stroke="#3366CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9.5 13C11.433 13 13 11.433 13 9.5C13 7.567 11.433 6 9.5 6C7.567 6 6 7.567 6 9.5C6 11.433 7.567 13 9.5 13Z"
        stroke="#3366CC"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M22.5 26C24.433 26 26 24.433 26 22.5C26 20.567 24.433 19 22.5 19C20.567 19 19 20.567 19 22.5C19 24.433 20.567 26 22.5 26Z"
        stroke="#3366CC"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </SvgIcon>
  );
}

export default ImgCommissionAccounting;
