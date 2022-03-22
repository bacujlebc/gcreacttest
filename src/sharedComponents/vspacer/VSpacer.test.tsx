import { render, screen } from '@testing-library/react';

import VSpacer from './VSpacer';

describe('VSpacer', () => {
  test('should render without errors', () => {
    render(<VSpacer transition={Boolean(true)} />);

    expect(screen.getByTestId('vspacer')).toBeInTheDocument();
  });
});
