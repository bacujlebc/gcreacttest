import { render, screen } from '@testing-library/react';

import WeatherIcon from './WeatherIcon';

const props = {
  title: 'iconTitle',
  path: 'iconPath',
  size: 20,
  viewBox: '0 -5 35 40',
};

describe('WeatherIcon', () => {
  test('should render without errors', () => {
    render(
      <WeatherIcon
        title={props.title}
        path={props.path}
        size={props.size}
        viewBox={props.viewBox}
      />,
    );

    expect(screen.getByTitle(props.title)).toBeInTheDocument();
  });
});
