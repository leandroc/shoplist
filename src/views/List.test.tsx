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

import { List } from './List';

const UserHasSignedInProvider: React.FC = ({ children }) => {
  return (
    <RoutesWrapper
      initialEntries={['/list']}
      routes={[
        {
          path: '/list/:listId',
          element: <>page to edit</>,
        },
        {
          path: '/list',
          element: children,
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
  render(<List />, { wrapper: UserHasSignedInProvider });
};

describe('<List />', () => {
  test('should render the form', async () => {
    await signInEmptyUser();

    renderComponent();

    await screen.findByRole('textbox', { name: /List name/i });
    await screen.findByRole('button', { name: /Save/i });
  });

  test('should create a list', async () => {
    await signInCreateUser();

    renderComponent();

    const newListName = faker.lorem.sentence();

    const listName = await screen.findByRole('textbox', { name: /List name/i });
    UserEvent.clear(listName);
    UserEvent.type(listName, newListName);

    const saveButton = await screen.findByRole('button', { name: /Save/i });
    UserEvent.click(saveButton);

    await screen.findByText(/carregando.../i);

    await screen.findByText(/page to edit/i)
  });
});
