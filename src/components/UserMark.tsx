const UserMark = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle opacity="0.2" cx="37.5" cy="37.5" r="37.5" fill="#DE994A" />
      <circle opacity="0.2" cx="37.5" cy="37.4999" r="26.5" fill="#DE994A" />
      <g filter="url(#filter0_d_38_276)">
        <circle cx="37.5" cy="37.5" r="13.5" fill="#DE994A" />
        <circle cx="37.5" cy="37.5" r="16" stroke="white" strokeWidth="5" />
      </g>
      <defs>
        <filter
          id="filter0_d_38_276"
          x="3"
          y="3.00003"
          width="77"
          height="77"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.4625 0 0 0 0 0.4625 0 0 0 0 0.4625 0 0 0 0.3 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_38_276"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_38_276"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default UserMark;
