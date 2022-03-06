import React from 'react';
import { render, screen } from '@testing-library/react';

import { UserHasSignedInProvider } from '../setupTests';

import { Home } from './Home';

const renderComponent = () => {
  render(<Home />, { wrapper: UserHasSignedInProvider });
};

describe('<Home />', () => {
  test('should render the empty component', async () => {
    renderComponent();

    const createButton = await screen.findByRole('button', { name: /Start with a new list/i });
    expect(createButton).toBeInTheDocument();
  });
});
