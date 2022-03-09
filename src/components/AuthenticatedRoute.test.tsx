import React from 'react';
import { render, screen } from '@testing-library/react';

import {
  UserHasSignedInProvider,
  signInEmptyUser,
  // logout
} from '../setupTests';

import { AuthenticatedRoute } from './AuthenticatedRoute';

const renderComponent = () => {
  render(
    <AuthenticatedRoute>
      <>user has signed in</>
    </AuthenticatedRoute>,
    {
      wrapper: UserHasSignedInProvider,
    }
  );
};

describe('<AuthenticatedRoute />', () => {
  test('should render the component and show loading state', async () => {
    renderComponent();

    const el = await screen.findByText(/carregando.../i);
    expect(el).toBeInTheDocument();
  });

  test('should redirect to login if user is not signed in', async () => {
    renderComponent();

    const el = await screen.findByText(/user must sign in/i);
    expect(el).toBeInTheDocument();
  });

  test('should render the children component', async () => {
    await signInEmptyUser();

    renderComponent();

    const el = await screen.findByText(/user has signed in/i);
    expect(el).toBeInTheDocument();
  });
});
