import { render, screen } from '@testing-library/react';

import { IWeatherCardProps } from './interfaces';
import { IWeather } from '../../interfaces';

import WeatherCard from './WeatherCard';

jest.mock('react-spinners/PulseLoader', () => ({
  __esModule: true,
  default: () => <div>PulseLoader</div>,
}));

const weatherItem: IWeather = {
  date: 'Wed 20 March',
  description: 'rain',
  temperature: {
    max: '12',
    min: '8',
    current: '12',
  },
  wind: 'fast',
  humidity: 53,
  pressure: 1024,
  icon: 'rain',
};

const props: IWeatherCardProps = {
  selectedCountry: {
    label: 'Ukraine (Kyiv)',
    value: {
      capital: 'Kyiv',
      country: 'Ukraine',
      latlng: [23.34, 12.22],
    },
  },
  weather: {
    current: weatherItem,
    daily: [weatherItem],
  },
  isLoading: false,
};

describe('WeatherCard', () => {
  test('should render without errors', () => {
    render(
      <WeatherCard
        selectedCountry={props.selectedCountry}
        weather={props.weather}
        isLoading={props.isLoading}
      />,
    );

    expect(screen.getByText(weatherItem.date)).toBeInTheDocument();
  });

  test('should render null when weather was not provided', () => {
    render(
      <WeatherCard
        selectedCountry={props.selectedCountry}
        weather={null}
        isLoading={props.isLoading}
      />,
    );

    expect(screen.queryByText(weatherItem.date)).not.toBeInTheDocument();
  });

  test('should render Loader', () => {
    render(
      <WeatherCard
        selectedCountry={props.selectedCountry}
        weather={props.weather}
        isLoading={Boolean(true)}
      />,
    );

    expect(screen.getByText('PulseLoader')).toBeInTheDocument();
  });
});
