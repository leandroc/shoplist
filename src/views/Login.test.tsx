import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import {
  TEST_USER,
  UserHasSignedOutProvider,
  signInTestUser,
  //logout
} from '../setupTests';

import { Login } from './Login';

const renderComponent = () => {
  render(<Login />, { wrapper: UserHasSignedOutProvider });
};

describe('<Login />', () => {
  test('should render the component and show loading state', async () => {
    // await logout();
    renderComponent();

    const el = await screen.findByText(/carregando.../i);
    expect(el).toBeInTheDocument();
  });

  test('should redirect to home if user is signed in', async () => {
    // await logout();
    await signInTestUser();

    renderComponent();

    const el = await screen.findByText(/user has signed in/i);
    expect(el).toBeInTheDocument();
  });

  test('should allow to login with email', async () => {
    // await logout();
    renderComponent();

    const emailInput = await screen.findByLabelText(/email address/i);
    expect(emailInput).toBeInTheDocument();
    UserEvent.clear(emailInput);

    const passwordInput = await screen.findByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    UserEvent.clear(passwordInput);

    const emailButton = await screen.findByRole('button', { name: 'Sign in', exact: true });
    expect(emailButton).toBeInTheDocument();
    expect(emailButton).toHaveAttribute('type', 'submit');

    UserEvent.type(emailInput, TEST_USER.email);
    UserEvent.type(passwordInput, TEST_USER.password);
    UserEvent.click(emailButton);

    const loadingElement = await screen.findByText(/carregando.../i);
    expect(loadingElement).toBeInTheDocument();

    const userHasSignInElement = await screen.findByText(/user has signed in/i);
    expect(userHasSignInElement).toBeInTheDocument();
  });

  // couldn't find a easy way to test this
  test.skip('should allow to login with google', async () => {
    // await logout();
    renderComponent();

    const gmailButton = await screen.findByRole('button', {
      name: /sign in with google/i,
      exact: false,
    });
    expect(gmailButton).toBeInTheDocument();

    UserEvent.click(gmailButton);

    const loadingElement = await screen.findByText(/carregando.../i);
    expect(loadingElement).toBeInTheDocument();

    const userHasSignInElement = await screen.findByText(/user has signed in/i);
    expect(userHasSignInElement).toBeInTheDocument();
  });
});
