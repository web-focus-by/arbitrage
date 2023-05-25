import { SvgIcon } from "@mui/material";


function ImgHedging(props) {
  return (
    <SvgIcon {...props}>
      <path d="M25 7L7 25" stroke="#3366CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 9H14" stroke="#3366CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 4V14" stroke="#3366CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 23H28" stroke="#3366CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </SvgIcon>
  );
}

export default ImgHedging;