import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import {
  UserHasSignedInProvider,
  signInTestUser,
  TEST_USER,
  // logout
} from '../setupTests';

import { Header } from './Header';

const renderComponent = () => {
  render(<Header />, {
    wrapper: UserHasSignedInProvider,
  });
};

describe('<Header />', () => {
  test('should render the component', async () => {
    await signInTestUser();

    renderComponent();

    const titleElement = await screen.findByText(/Shoplist/i);
    expect(titleElement).toBeInTheDocument();

    const avatarImageElement = await screen.findByRole('img');
    expect(avatarImageElement).toHaveAttribute('src', TEST_USER.photoURL);

    const avatarButtonElement = await screen.findByTestId('user-options');
    UserEvent.click(avatarButtonElement);

    await screen.findByText('Edit profile');
    await screen.findByText('Sign out');
  });
});
