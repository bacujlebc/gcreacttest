import getIcon from '../iconsMap';
import svgIcons from '../../assets/svgIcons';

describe('getIcon', () => {
  test('should return default param', () => {
    expect(getIcon('bla')).toEqual(svgIcons.sunny);
  });

  test('should return correct param', () => {
    expect(getIcon('03d')).toEqual(svgIcons.cloudy);
  });
});
