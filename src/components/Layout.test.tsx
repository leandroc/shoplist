import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  AllProviders,
  signInTestUser,

  // logout
} from '../setupTests';

import { Layout } from './Layout';

const renderComponent = () => {
  render(<Layout />, { wrapper: AllProviders });
};

describe('<Layout />', () => {
  test('should render the component', async () => {
    await signInTestUser();

    renderComponent();

    const titleElement = await screen.findByText(/Shoplist/i);
    expect(titleElement).toBeInTheDocument();
  });
});
