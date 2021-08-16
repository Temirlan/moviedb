import '@testing-library/jest-dom';

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SearchForm } from './components';
import { act } from 'react-dom/test-utils';

test('calls correct function on Submit', async () => {
  const onClick = jest.fn();
  const { getByText } = render(<SearchForm initialValues={{ search: '' }} onSubmit={onClick} />);

  await act(async () => {
    fireEvent.click(getByText('Submit'));
  });

  expect(onClick).toHaveBeenCalled();
});
