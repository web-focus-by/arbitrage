import { SvgIcon, SvgIconProps } from '@mui/material';

type TBellIcon = SvgIconProps & {
  haveNotification?: boolean;
};
function BellIcon(props: TBellIcon) {
  const { haveNotification, ...svgProps } = props;
  return (
    <SvgIcon {...svgProps} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.26904 9.74994C5.2678 8.86045 5.44262 7.97951 5.78343 7.1579C6.12424 6.33628 6.6243 5.59025 7.25477 4.9628C7.88525 4.33535 8.63368 3.83889 9.45693 3.50204C10.2802 3.16519 11.1619 2.99461 12.0514 3.00013C15.763 3.02772 18.7317 6.11275 18.7317 9.83468V10.4999C18.7317 13.8577 19.4342 15.8061 20.0529 16.871C20.1196 16.9848 20.1551 17.1142 20.1558 17.246C20.1565 17.3779 20.1224 17.5076 20.0569 17.6221C19.9915 17.7366 19.8971 17.8318 19.7831 17.8982C19.6691 17.9645 19.5397 17.9996 19.4078 17.9999H4.59222C4.46034 17.9996 4.33087 17.9645 4.21689 17.8981C4.1029 17.8318 4.00844 17.7366 3.94301 17.622C3.87759 17.5075 3.84352 17.3778 3.84425 17.2459C3.84498 17.114 3.88048 16.9846 3.94716 16.8709C4.56622 15.8059 5.26904 13.8575 5.26904 10.4999L5.26904 9.74994Z"
        stroke="#575757"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 18V18.75C9 19.5456 9.31607 20.3087 9.87868 20.8713C10.4413 21.4339 11.2044 21.75 12 21.75C12.7956 21.75 13.5587 21.4339 14.1213 20.8713C14.6839 20.3087 15 19.5456 15 18.75V18"
        stroke="#575757"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {haveNotification && <circle cx="18" cy="6" r="4" fill="#3366CC" />}
    </SvgIcon>
  );
}

export default BellIcon;
