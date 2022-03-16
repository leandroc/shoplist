import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import faker from '@faker-js/faker'

import {
  RoutesWrapper,
  signInEmptyUser,
  signInCreateUser,
  // signInReadUser,
  // signInUpdateUser,
} from '../setupTests';

import { Edit } from './Edit';

const UserHasSignedInProvider: React.FC = ({ children }) => {
  return (
    <RoutesWrapper
      initialEntries={['/list/RHtycU1XmYg8aUvkNor5']}
      routes={[
        {
          path: '/list/:listId',
          element: children,
        },
        {
          path: '/list',
          element: <>create page</>,
        },
        {
          path: '/',
          element: <>home</>,
        },
      ]}
    />
  );
};

const renderComponent = () => {
  render(<Edit />, { wrapper: UserHasSignedInProvider });
};

describe('<Edit />', () => {
  test('should render the form', async () => {
    await signInCreateUser();

    renderComponent();

    await screen.findByRole('textbox', { name: /List name/i });
    await screen.findByRole('button', { name: /Save/i });
  });
});
