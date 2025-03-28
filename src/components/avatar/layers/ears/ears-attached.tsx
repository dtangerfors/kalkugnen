export default function EarsAttached(props: { color: string }) {
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
        d="M124.5 180.176C122.17 179.408 119.655 179 117.08 179C106.587 179 98.0801 185.5 99.08 197.5C100.122 210 107.587 214.5 118.08 214.5C119.248 214.5 120.391 214.397 121.5 214.201C122.711 213.987 123.881 213.661 125 213.235"
        stroke="black"
        strokeWidth="8"
      />
      <path
        d="M125.5 213.036C123.22 213.979 120.713 214.5 118.08 214.5C107.587 214.5 100.122 210 99.08 197.5C98.0801 185.5 106.587 179 117.08 179C120.217 179 123.267 179.606 126 180.73L125.5 213.036Z"
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
