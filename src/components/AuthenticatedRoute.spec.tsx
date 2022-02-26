import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, logout } from '../firebase-config';

import * as UserContext from '../contexts/UserContext';
import { AuthenticatedRoute } from './AuthenticatedRoute';

const TEST_USER_EMAIL = 'test.user@email.com';
const TEST_USER_PASSWORD = '123456';

const AllTheRequiredProviders: React.FC = ({ children }) => {
  return (
    <UserContext.UserContextProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/login" element={<>user must sign in</>} />

          <Route path="/" element={<>{children}</>} />
        </Routes>
      </MemoryRouter>
    </UserContext.UserContextProvider>
  );
};

const renderComponent = () => {
  render(
    <AuthenticatedRoute>
      <>user has signed in</>
    </AuthenticatedRoute>,
    {
      wrapper: AllTheRequiredProviders,
    }
  );
};

describe('<AuthenticatedRoute />', () => {
  test('should render the component and show loading state', async () => {
    await logout();
    renderComponent();

    const el = await screen.findByText(/carregando.../i);
    expect(el).toBeInTheDocument();
  });

  test('should redirect to login if user is not signed in', async () => {
    await logout();
    renderComponent();

    const el = await screen.findByText(/user must sign in/i);
    expect(el).toBeInTheDocument();
  });

  test('should render the children component', async () => {
    await logout();
    await signInWithEmailAndPassword(auth, TEST_USER_EMAIL, TEST_USER_PASSWORD);

    renderComponent();

    const el = await screen.findByText(/user has signed in/i);
    expect(el).toBeInTheDocument();
  });
});
