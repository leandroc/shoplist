import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import { UserHasSignedInProvider, signInTestUser } from '../setupTests';

import { Home } from './Home';

const renderComponent = () => {
  render(<Home />, { wrapper: UserHasSignedInProvider });
};

describe('<Home />', () => {
  test('should render the component', async () => {
    await signInTestUser();

    renderComponent();

    const logoutButton = await screen.findByRole('button', { name: /Start with a new list/i });
    expect(logoutButton).toBeInTheDocument();
  });
});