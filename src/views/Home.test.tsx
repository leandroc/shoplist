import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import { UserHasSignedInProvider, signInTestUser } from '../setupTests';

import { Home } from './Home';

const renderComponent = () => {
  render(<Home />, { wrapper: UserHasSignedInProvider });
};

describe('<Home />', () => {
  test('should sign out and redirect to login page', async () => {
    // await logout();
    await signInTestUser();

    renderComponent();

    const logoutButton = await screen.findByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    UserEvent.click(logoutButton);

    const el = await screen.findByText(/user must sign in/i);
    expect(el).toBeInTheDocument();
  });
});
