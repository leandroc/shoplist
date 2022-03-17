import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import faker from '@faker-js/faker';

import {
  RoutesWrapper,
  signInEmptyUser,
  signInCreateUser,
  // signInReadUser,
  // signInUpdateUser,
} from '../setupTests';

import { Edit } from './Edit';

const UserHasSignedInProvider: React.FC<{ listId?: string }> = ({ listId, children }) => {
  return (
    <RoutesWrapper
      initialEntries={[!listId ? '/' : `/list/${listId}`]}
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

const renderComponent = (listId?: string) => {
  render(<Edit />, { wrapper: (props) => <UserHasSignedInProvider listId={listId} {...props} /> });
};

describe('<Edit />', () => {
  test('should render the form with an empty items list', async () => {
    await signInCreateUser();

    renderComponent('RHtycU1XmYg8aUvkNor5');

    await screen.findByText(/carregando.../i);

    const listTitle = await screen.findByRole('textbox', { name: /List name/i });
    expect(listTitle).toHaveValue('List to create items');

    await screen.findByText(/Items/i);

    await screen.findByRole('button', { name: /Save/i });

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(1); // just the creation form
  });

  test('should redirect to home if user not allowed', async () => {
    await signInEmptyUser();

    renderComponent('RHtycU1XmYg8aUvkNor5');

    await screen.findByText(/carregando.../i);

    await screen.findByText(/home/i);
  });

  test('should redirect to home if listId is empty', async () => {
    await signInEmptyUser();

    renderComponent();

    await screen.findByText(/home/i);
  });
});
