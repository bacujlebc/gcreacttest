import { render, screen } from '@testing-library/react';
import { ReactElement, useEffect } from 'react';
import useFetchLocations from '../useFetchLocations';

function setupFetchStub(data: any) {
  return new Promise((resolve) => {
    resolve({
      json: () =>
        Promise.resolve({
          data,
        }),
    });
  });
}

global.fetch = jest.fn().mockResolvedValue({
  asds: 'adfds',
});

// window.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ test: 100 }),
//   })) as jest.Mock;

describe('useFetchLocations', () => {
  // beforeEach(() => {
  //   (global.fetch as jest.Mock).mockImplementation(() => Promise.resolve());
  // });
  test('should return data', () => {
    function TestComponent(): ReactElement {
      const { data, loading, fetchLocations } = useFetchLocations();

      useEffect(() => {
        fetchLocations();
      });

      return (
        <>
          {data.length}
          {loading}
        </>
      );
    }

    render(<TestComponent />);

    // console.log(window.fetch.mock);

    expect(screen.getByText('false')).toBeInTheDocument();
  });
});
