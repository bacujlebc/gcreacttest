import { render, screen } from '@testing-library/react';

import useFetchLocations from 'hooks/useFetchLocations';
import useFetchWeather from 'hooks/useFetchWeather';
import { IFetchLocations, IFetchWeather, IWeather } from 'interfaces';

import Dashboard from './dashboard';

jest.mock('hooks/useFetchLocations', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('hooks/useFetchWeather', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-spinners/PulseLoader', () => ({
  __esModule: true,
  default: () => <div>PulseLoader</div>,
}));

jest.mock('react-select', () => ({
  __esModule: true,
  default: () => <div>Select</div>,
}));

jest.mock('../../components', () => ({
  ...jest.requireActual('../../components'),
  WeatherCard: () => <div>WeatherCard</div>,
}));

const useFetchLocationsMock: IFetchLocations = {
  data: [
    {
      name: {
        common: 'Ukraine',
      },
      capital: ['Kyiv'],
      capitalInfo: {
        latlng: [23.11, 33.09],
      },
    },
  ],
  loading: false,
  fetchLocations: jest.fn(),
};

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

const useFetchWeatherMock: IFetchWeather = {
  data: {
    current: weatherItem,
    daily: [weatherItem],
  },
  loading: false,
  fetchWeather: jest.fn(),
};

describe('Dashboard', () => {
  beforeEach(() => {
    (useFetchLocations as jest.Mock).mockReturnValue(useFetchLocationsMock);
    (useFetchWeather as jest.Mock).mockReturnValue(useFetchWeatherMock);
  });

  test('should render without errors', () => {
    render(<Dashboard />);

    expect(screen.getByText('WeatherCard')).toBeInTheDocument();
  });

  test('should render loading component', () => {
    (useFetchLocations as jest.Mock).mockReturnValue({
      ...useFetchLocationsMock,
      loading: true,
    });

    render(<Dashboard />);

    expect(screen.getByText('PulseLoader')).toBeInTheDocument();
  });
});
