import { useState } from 'react';

import { IFetchLocations, ILocation } from '../interfaces';

const useFetchLocations = (): IFetchLocations => {
  const [data, setData] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(' hey1');
  const fetchLocations = (): void => {
    console.log(fetch('https://restcountries.com/v3.1/all'), ' hey2');
    setLoading(true);
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => {
        console.log(res, ' res');
        return res.json();
      })
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        throw new Error('Failed to fetch locations.');
      });
  };

  return {
    data,
    loading,
    fetchLocations,
  };
};

export default useFetchLocations;
