import { useState } from 'react';
import moment from 'moment';

import { IWeather, IFetchedWeather, IFetchWeather, IWeatherDayly, IMappedData, IWeatherRange } from '../interfaces';

import getIcon from '../helpers/iconsMap';

const API_KEY = 'dd890977fb50a201f7c1fca626d7473b';

const mapDailyWeather = (daily: Array<IWeatherDayly<IWeatherRange>>): IWeather[] => daily.map(
  (dayWeather: IWeatherDayly<IWeatherRange>): IWeather => ({
    date: moment(dayWeather.dt * 1000).format('ddd DD MMMM'),
    description: dayWeather.weather[0].main || '',
    temperature: {
      min: dayWeather.temp.min.toFixed(0),
      max: dayWeather.temp.min.toFixed(0),
      current: '',
    },
    wind: dayWeather.wind_speed.toFixed(0),
    humidity: dayWeather.humidity,
    pressure: dayWeather.pressure,
    icon: dayWeather.weather[0] && getIcon(dayWeather.weather[0].icon),
  }),
);

const mapWeather = (
  current: IWeatherDayly<number>,
  firstDay: IWeatherDayly<IWeatherRange>,
): IWeather => ({
  date: moment(current.dt * 1000).format('ddd DD MMMM'),
  description: current.weather[0].main || '',
  temperature: {
    min: firstDay.temp.min.toFixed(0),
    max: firstDay.temp.max.toFixed(0),
    current: current?.temp.toFixed(0),
  },
  wind: current.wind_speed.toFixed(0),
  humidity: current.humidity,
  pressure: current.pressure,
  icon: current.weather[0] && getIcon(current.weather[0].icon),
});

const mapData = ({ current, daily }: IFetchedWeather): IMappedData | null => {
  if (current && daily) {
    return {
      daily: mapDailyWeather(daily.slice(0, 4)),
      current: mapWeather(current, daily[0]),
    };
  }

  return null;
};

const useFetchWeather = (): IFetchWeather => {
  const [data, setData] = useState<IMappedData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (lat: number, lng: number): Promise<void> => {
    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,minutely&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setData(mapData(res));
      })
      .catch((err) => {
        throw new Error('Failed to fetch weather.');
      });
  };

  return {
    data,
    loading,
    fetchWeather,
  };
};

export default useFetchWeather;
