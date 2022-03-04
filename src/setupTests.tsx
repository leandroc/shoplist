// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, logout } from './firebase-config';

import * as UserContext from './contexts/UserContext';

export const TEST_USER = {
  displayName: 'Test user',
  email: 'test.user@email.com',
  password: '123456',
  photoURL: 'https://placekitten.com/800/800',
};

export const UserHasSignedInProvider: React.FC = ({ children }) => {
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

export const UserHasSignedOutProvider: React.FC = ({ children }) => {
  return (
    <UserContext.UserContextProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={children} />

          <Route path="/" element={<>user has signed in</>} />
        </Routes>
      </MemoryRouter>
    </UserContext.UserContextProvider>
  );
};

export const signInTestUser = async () =>
  signInWithEmailAndPassword(auth, TEST_USER.email, TEST_USER.password);

beforeEach(async () => {
  await logout();
});

export { logout } from './firebase-config';
