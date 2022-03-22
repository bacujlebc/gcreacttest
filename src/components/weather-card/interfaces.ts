import { ILocationOption, IMappedData, IWeather } from '../../interfaces';

export interface IWeatherCardProps {
  selectedCountry: ILocationOption | null;
  weather: IMappedData | null;
  isLoading: boolean;
}

export type ILeftColumnProps = {
  capital?: string;
  temperature: string;
  minMaxTemp: string;
  currentIcon: string;
  currentDescription: string;
  wind: string;
  humidity: number;
  pressure: number;
};

export type IRightColumnProps = {
  currentIcon: string;
  currentDescription: string;
};

export type IWeatherDailyBlockProps = {
  daily: IWeather[];
};
