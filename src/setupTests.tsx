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

export const TEST_USERS = {
  EMPTY: {
    uid: 'GG0pieGJLnPiNLFmY12mpzhUuyGR',
    displayName: 'Empty user',
    email: 'empty.user@email.com',
    password: '123456',
    photoURL: 'https://placekitten.com/801/800',
  },
  CREATE: {
    uid: 'c1zdxfIY2SkZdZDNxEMiWwHIM2Wq',
    displayName: 'Create user',
    email: 'create.user@email.com',
    password: '123456',
    photoURL: 'https://placekitten.com/800/801',
  },
  READ: {
    uid: 'ITfXNTDllw13WGGQQDjF4RnthtNM',
    displayName: 'Read user',
    email: 'read.user@email.com',
    password: '123456',
    photoURL: 'https://placekitten.com/800/800',
  },
  UPDATE: {
    uid: 'P4kFhvJFRJPHsQ4yxNbDW308Jt65',
    displayName: 'Update user',
    email: 'update.user@email.com',
    password: '123456',
    photoURL: 'https://placekitten.com/801/800',
  },
};

export const AllProviders: React.FC = ({ children }) => {
  return <UserContext.UserContextProvider>{children}</UserContext.UserContextProvider>;
};

export const UserHasSignedInProvider: React.FC = ({ children }) => {
  return (
    <AllProviders>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/login" element={<>user must sign in</>} />

          <Route path="/" element={children} />
        </Routes>
      </MemoryRouter>
    </AllProviders>
  );
};

export const UserHasSignedOutProvider: React.FC = ({ children }) => {
  return (
    <AllProviders>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={children} />

          <Route path="/" element={<>user has signed in</>} />
        </Routes>
      </MemoryRouter>
    </AllProviders>
  );
};

export const signInEmptyUser = async () => {
  return signInWithEmailAndPassword(auth, TEST_USERS.EMPTY.email, TEST_USERS.EMPTY.password);
};

export const signInCreateUser = async () => {
  return signInWithEmailAndPassword(auth, TEST_USERS.CREATE.email, TEST_USERS.CREATE.password);
};

export const signInReadUser = async () => {
  return signInWithEmailAndPassword(auth, TEST_USERS.READ.email, TEST_USERS.READ.password);
};

export const signInUpdateUser = async () => {
  return signInWithEmailAndPassword(auth, TEST_USERS.UPDATE.email, TEST_USERS.UPDATE.password);
};

beforeEach(async () => {
  await logout();
});

export { logout } from './firebase-config';
