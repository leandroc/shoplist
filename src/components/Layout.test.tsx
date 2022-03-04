import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  UserHasSignedInProvider,
  signInTestUser,

  // logout
} from '../setupTests';

import { Layout } from './Layout';

const renderComponent = () => {
  render(<Layout />, {
    wrapper: UserHasSignedInProvider,
  });
};

describe('<Layout />', () => {
  test('should render the component', async () => {
    await signInTestUser();

    renderComponent();

    const titleElement = await screen.findByText(/Shoplist/i);
    expect(titleElement).toBeInTheDocument();
  });
});
