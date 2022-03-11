import React from 'react';
import { render, screen } from '@testing-library/react';
// import UserEvent from '@testing-library/user-event';

import {
  // RoutesWrapper,
  // signInEmptyUser,
  // signInCreateUser,
  // signInReadUser,
  // signInUpdateUser,
} from '../setupTests';

import { List } from './List';

/*
const UserHasSignedInProvider: React.FC = ({ children }) => {
  return (
    <RoutesWrapper
      routes={[
        { path: '/login', element: <>user must sign in</> },
        {
          path: '/list/:listId',
          element: <>edition page</>,
        },
        {
          path: '/list',
          element: <>creation page</>,
        },
        {
          path: '/',
          element: children,
        },
      ]}
    />
  );
};
*/

const renderComponent = () => {
  render(
    <List />
    // , { wrapper: UserHasSignedInProvider }
  );
};

describe('<List />', () => {
  test('should render the empty component', async () => {
    renderComponent();

    await screen.findByText(/list details page/i);
  });
});
