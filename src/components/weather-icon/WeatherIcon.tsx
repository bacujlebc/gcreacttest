import { ReactElement } from 'react';

interface IWeatherIcon {
  path: string;
  title: string;
  viewBox?: string;
  color?: string;
  size?: number;
}

// eslint-disable-next-line no-unused-vars
function WeatherIcon({
  title,
  path,
  size = 40,
  viewBox = '0 -5 35 40',
  color = '#4BC4F7',
}: IWeatherIcon): ReactElement {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={color}
    >
      <title>{title}</title>
      <path d={path} />
    </svg>
  );
}

export default WeatherIcon;
