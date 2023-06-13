import { SVGProps } from 'react';
const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      stroke="#36C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M9.722 17.5c4.027 0 7.292-3.358 7.292-7.5 0-4.142-3.265-7.5-7.292-7.5-4.027 0-7.291 3.358-7.291 7.5 0 4.142 3.264 7.5 7.291 7.5Z"
    />
    <path
      stroke="#36C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M9.115 9.375h.607v4.375h.608"
    />
    <path
      fill="#36C"
      d="M9.722 7.5c.504 0 .912-.42.912-.938a.925.925 0 0 0-.912-.937.925.925 0 0 0-.911.938c0 .517.408.937.911.937Z"
    />
  </svg>
);
export default InfoIcon;
