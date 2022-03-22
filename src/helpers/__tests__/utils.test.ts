import { mapSortLocations } from '../utils';

describe('mapSortLocations', () => {
  const locations = [
    {
      name: {
        common: 'Ukraine',
      },
      capital: ['Kyiv'],
      capitalInfo: {
        latlng: [23.44, 21.11],
      },
    },
    {
      name: {
        common: 'Albania',
      },
      capital: ['Tirana'],
      capitalInfo: {
        latlng: [13.44, 11.11],
      },
    },
  ];

  test('should return mapped and sorted locations', () => {
    const result = mapSortLocations(locations);
    expect(result[0].value.country).toEqual(locations[1].name.common);
  });

  test('should not change sort order', () => {
    const result = mapSortLocations(locations.reverse());
    expect(result[0].value.country).toEqual(locations[0].name.common);
  });

  test('no need in sort', () => {
    const result = mapSortLocations([locations[0], locations[0]]);
    expect(result[0].value.country).toEqual(locations[0].name.common);
  });
});
