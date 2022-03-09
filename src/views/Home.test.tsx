import React from 'react';
import { render, screen } from '@testing-library/react';

import { UserHasSignedInProvider, signInEmptyUser, signInReadUser } from '../setupTests';

import { Home } from './Home';

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
});
