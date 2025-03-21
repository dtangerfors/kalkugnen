export default function EarsDetached(props: { color: string }) {
  const { color } = props;
  const mainColor = color || "#F9C9B6";
  return (
    <svg
      width="380"
      height="380"
      viewBox="0 0 380 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M131 182.249V181.13L130.046 180.545C126.312 178.254 121.772 177 117.08 177C111.44 177 106.159 178.747 102.398 182.295C98.5942 185.882 96.5421 191.127 97.0869 197.666C97.6179 204.038 99.7569 208.727 103.305 211.843C103.013 212.842 102.927 213.92 103.062 215.053C103.452 218.322 105.104 220.677 107.657 222.128C110.091 223.511 113.206 224 116.524 224C122.003 224 126.808 221.053 130.466 217.111L131 216.536V215.751V182.249Z"
        stroke="black"
        strokeWidth="4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M136.972 197.984C137.043 197.332 137.08 196.67 137.08 196C137.08 185.783 127.573 179 117.08 179C106.587 179 98.0801 185.5 99.08 197.5C99.6364 204.177 102.026 208.572 105.731 211.217C105.142 212.241 104.885 213.444 105.048 214.817C105.677 220.098 110.186 222 116.524 222C127.629 222 136.416 207.953 136.972 197.984Z"
        fill={mainColor}
      />
      <path
        d="M121.5 187.5C117.5 185.667 108.7 184.7 105.5 195.5"
        stroke="black"
        strokeWidth="4"
      />
      <path
        d="M111 188C113.167 189.833 117.3 195.5 116.5 203.5"
        stroke="black"
        strokeWidth="4"
      />
    </svg>
  );
}
