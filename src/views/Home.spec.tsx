import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, logout } from '../firebase-config';

import * as UserContext from '../contexts/UserContext';
import { Home } from './Home';

const TEST_USER_EMAIL = 'test.user@email.com';
const TEST_USER_PASSWORD = '123456';

const AllTheRequiredProviders: React.FC = ({ children }) => {
  return (
    <UserContext.UserContextProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/login" element={<>user must sign in</>} />
          <Route path="/" element={children} />
        </Routes>
      </MemoryRouter>
    </UserContext.UserContextProvider>
  );
};

const renderComponent = () => {
  render(<Home />, { wrapper: AllTheRequiredProviders });
};

describe('<Home />', () => {
  test('should sign out and redirect to login page', async () => {
    await logout();
    await signInWithEmailAndPassword(auth, TEST_USER_EMAIL, TEST_USER_PASSWORD);

    renderComponent();

    const logoutButton = await screen.findByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    UserEvent.click(logoutButton);

    const el = await screen.findByText(/user must sign in/i);
    expect(el).toBeInTheDocument();
  });
});
