export interface IMappedData {
  current: IWeather;
  daily: IWeather[];
}

interface IWeatherTemperature {
  min: string;
  max: string;
  current: string;
}

export interface IWeather {
  date: string;
  description: string;
  temperature: IWeatherTemperature;
  wind: string;
  humidity: number;
  pressure: number;
  icon: string;
}

export interface IFetchWeather {
  data: IMappedData | null;
  loading: boolean;
  fetchWeather: (lat: number, lng: number) => Promise<void>;
}

type IWeatherDailyTemperature<T> = T;

interface IWeatherDaylyWeather {
  main: string;
  icon: string;
}

export type IWeatherRange = {
  min: number;
  max: number;
};

export interface IWeatherDayly<T> {
  dt: number;
  temp: IWeatherDailyTemperature<T>;
  weather: IWeatherDaylyWeather[];
  wind_speed: number;
  humidity: number;
  pressure: number;
}

export interface IFetchedWeather {
  current: IWeatherDayly<number>;
  daily: IWeatherDayly<IWeatherRange>[];
}

// ==== End Weather ====

interface ILocationCapitalInfo {
  latlng: number[];
}

interface ILocationName {
  common: string;
}

export interface ILocation {
  name: ILocationName;
  capital: string[];
  capitalInfo: ILocationCapitalInfo;
}

export interface IFetchLocations {
  data: ILocation[];
  loading: boolean;
  fetchLocations: () => void;
}

// ==== End FetchLocations ====

interface ILocationOptionValue {
  capital: string;
  country: string;
  latlng: number[];
}

export interface ILocationOption {
  label: string;
  value: ILocationOptionValue;
}

// ==== End LocationOption ====
