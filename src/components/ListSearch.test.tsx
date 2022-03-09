import React from 'react';
import { render, screen } from '@testing-library/react';

// import {
//   AllProviders,

//   // logout
// } from '../setupTests';

import { ListSearch } from './ListSearch';

const renderComponent = () => {
  render(<ListSearch />);
};

describe('<ListSearch />', () => {
  test('should render the component', async () => {
    renderComponent();

    const searchInput = await screen.findByTestId('list.name');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toBeDisabled();

    const addNewListButton = await screen.findByRole('button', { name: 'Create a new list' });
    expect(addNewListButton).toBeInTheDocument();
  });
});
