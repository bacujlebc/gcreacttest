import { useEffect, useMemo, ReactElement, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import PulseLoader from 'react-spinners/PulseLoader';

// hooks
import useFetchLocations from 'hooks/useFetchLocations';
import useFetchWeather from 'hooks/useFetchWeather';

import { ILocationOption } from '../../interfaces';

import { WeatherCard } from '../../components';

import { mapSortLocations } from '../../helpers/utils';

import './dashboard.css';

function Dashboard() : ReactElement {
  const [selectedCountry, setSelectedCountry] = useState<SingleValue<ILocationOption>>(null);

  const { data: weather, fetchWeather, loading: isWeatherLoading } = useFetchWeather();
  const { data: locations, fetchLocations, loading: areLocationsLoading } = useFetchLocations();

  useEffect(() => {
    fetchLocations();
  }, []);

  // eslint-disable-next-line max-len
  const mappedLocations = useMemo((): ILocationOption[] => mapSortLocations(locations), [locations]);

  useEffect(() => {
    if (!selectedCountry && mappedLocations.length) {
      setSelectedCountry(mappedLocations[0]);
    }
  }, [selectedCountry, mappedLocations]);

  useEffect(() => {
    if (selectedCountry) {
      const [lat, lng] = selectedCountry.value.latlng;
      fetchWeather(lat, lng);
    }
  }, [selectedCountry]);

  return (
    <div className="container">
      {
        areLocationsLoading
          ? <PulseLoader color="#0099ff" loading={areLocationsLoading} size={25} margin={2} />
          : (
            <div className="flexColumn">
              <Select<ILocationOption>
                value={selectedCountry}
                options={mappedLocations}
                onChange={setSelectedCountry}
              />
              <WeatherCard
                weather={weather}
                isLoading={isWeatherLoading}
                selectedCountry={selectedCountry}
              />
            </div>
          )
      }
    </div>
  );
}

export default Dashboard;
