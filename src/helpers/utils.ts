import { ILocationOption, ILocation } from '../interfaces';

const mapSortLocations = (locations: ILocation[]): ILocationOption[] =>
  locations
    .reduce((acc: ILocationOption[], curr: ILocation): ILocationOption[] => {
      const {
        name: { common },
        capital,
        capitalInfo,
      } = curr;

      return [
        ...acc,
        {
          label: `${common} (${capital?.[0]})`,
          value: {
            capital: capital?.[0],
            country: common,
            latlng: capitalInfo?.latlng,
          },
        },
      ];
    }, [])
    .sort((a: ILocationOption, b: ILocationOption) => {
      if (a.value.country > b.value.country) return 1;
      if (a.value.country < b.value.country) return -1;
      return 0;
    });

export {
  // eslint-disable-next-line import/prefer-default-export
  mapSortLocations,
};
