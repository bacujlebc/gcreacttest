import { ReactElement } from 'react';

interface IVSpacerProps {
  factor?: number;
  transition?: boolean;
  testId?: string;
}

function VSpacer({
  factor = 2,
  transition = false,
  testId = 'vspacer',
}: IVSpacerProps): ReactElement {
  return (
    <div
      data-testid={testId}
      style={{
        height: factor * 8,
        width: '100%',
        transition: transition ? 'height .2s ease-out' : '',
      }}
    />
  );
}

export default VSpacer;
