import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import {  RoutesWrapper, signInEmptyUser, signInCreateUser, signInReadUser } from '../setupTests';

import { Home } from './Home';


const UserHasSignedInProvider: React.FC = ({ children }) => {
  return (
    <RoutesWrapper
      routes={[
        { path: '/login', element: <>user must sign in</> },
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

const renderComponent = () => {
  render(<Home />, { wrapper: UserHasSignedInProvider });
};

describe('<Home />', () => {
  test('should render the empty component', async () => {
    signInEmptyUser();

    renderComponent();

    await screen.findByText(/carregando.../i);

    const createButton = await screen.findByRole('button', { name: /Start with a new list/i });
    expect(createButton).toBeInTheDocument();

    UserEvent.click(createButton);

    // await screen.findByText('creation page')
  });

  test('should show the error', async () => {
    renderComponent();

    await screen.findByText(/carregando.../i);

    const listText = await screen.findByText(/ocorreu um erro/i);
    expect(listText).toBeInTheDocument();
  });

  test('should render the list component', async () => {
    await signInReadUser();
    renderComponent();

    await screen.findByText(/carregando.../i);

    const listText = await screen.findByText(/List to read/i);
    expect(listText).toBeInTheDocument();
  });

  test('should redirect to creation page', async () => {
    await signInCreateUser();
    renderComponent();

    await screen.findByText(/carregando.../i);

    const createButton = await screen.findByRole('button', { name: /Create a new list/i })
    expect(createButton).toBeInTheDocument();

    UserEvent.click(createButton);

    // await screen.findByText('creation page')
  });
});
