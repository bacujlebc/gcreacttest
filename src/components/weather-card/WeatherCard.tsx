import { ReactElement } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import moment from 'moment';

import { VSpacer } from 'sharedComponents';
import WeatherIcon from '../weather-icon';

import { IWeather } from '../../interfaces';
import {
  IWeatherCardProps,
  ILeftColumnProps,
  IRightColumnProps,
  IWeatherDailyBlockProps,
} from './interfaces';

import './WeatherCard.css';

function LeftColumn({
  capital,
  temperature,
  minMaxTemp,
  currentIcon,
  currentDescription,
  wind,
  humidity,
  pressure,
}: ILeftColumnProps): ReactElement {
  return (
    <div className="left-column">
      <h2>{capital}</h2>
      <VSpacer factor={1} />
      <h4>{moment().format('ddd DD MMMM')}</h4>
      <hr />

      <h1>{temperature}</h1>
      <VSpacer factor={1} />

      <h5>{minMaxTemp}</h5>
      <div className="card-container-description">
        <WeatherIcon
          size={20}
          path={currentIcon}
          title={currentDescription}
          color="#fff"
        />
        &nbsp;
        <h4>{currentDescription}</h4>
      </div>

      <hr />

      <h5>
        Wind: &nbsp;
        {wind}
        km/h
      </h5>
      <VSpacer factor={0.5} />
      <h5>
        Humidity: &nbsp;
        {humidity}%
      </h5>
      <VSpacer factor={0.5} />
      <h5>
        Pressure: &nbsp;
        {pressure}
        hPa
      </h5>
    </div>
  );
}

function RightColumn({
  currentIcon,
  currentDescription,
}: IRightColumnProps): ReactElement {
  return (
    <div className="right-column">
      <WeatherIcon
        size={100}
        path={currentIcon}
        title={currentDescription}
        color="#fff"
      />
    </div>
  );
}

function WeatherDailyBlock({ daily }: IWeatherDailyBlockProps): ReactElement {
  return (
    <div className="card-container-daily">
      {daily.map(
        (item: IWeather, i: number): ReactElement => (
          <div
            key={`${item.date}-${item.icon}`}
            className="card-container-daily-item"
          >
            <p>{item.date}</p>
            <VSpacer factor={3} />
            <WeatherIcon
              path={item.icon}
              title={item.description}
              color="#55c2f7"
            />
            <VSpacer factor={1} />
            <p>{item.description}</p>
            <VSpacer factor={1} />
            <p>
              {item.temperature.min} / {item.temperature.min} C
            </p>
          </div>
        ),
      )}
    </div>
  );
}

function WeatherCard({
  selectedCountry,
  weather,
  isLoading,
}: IWeatherCardProps): ReactElement | null {
  if (isLoading) {
    return (
      <div className="card-loader">
        <PulseLoader
          color="#0099ff"
          loading={Boolean(isLoading)}
          size={25}
          margin={2}
        />
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const {
    current: {
      temperature: { current, min, max },
      icon: currentIcon,
      description: currentDescription,
      wind,
      humidity,
      pressure,
    },
    daily,
  } = weather;

  const capital = selectedCountry?.value.capital;
  const temperature = `${current} C`;
  const minMaxTemp = `${max} / ${min} C`;

  return (
    <div className="card-container-wrapper">
      <div className="card-container-columns">
        <LeftColumn
          capital={capital}
          temperature={temperature}
          minMaxTemp={minMaxTemp}
          currentIcon={currentIcon}
          currentDescription={currentDescription}
          wind={wind}
          humidity={humidity}
          pressure={pressure}
        />
        <RightColumn
          currentIcon={currentIcon}
          currentDescription={currentDescription}
        />
      </div>

      <WeatherDailyBlock daily={daily} />
    </div>
  );
}

export default WeatherCard;
