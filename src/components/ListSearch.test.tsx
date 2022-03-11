import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

// import {
//   AllProviders,

//   // logout
// } from '../setupTests';

import { ListSearch } from './ListSearch';

const renderComponent = (props: any) => {
  render(<ListSearch {...props} />);
};

describe('<ListSearch />', () => {
  test('should render the component', async () => {
    const mockOnClick = jest.fn();

    renderComponent({ onClick: mockOnClick });

    const searchInput = await screen.findByTestId('list.name');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toBeDisabled();

    const addNewListButton = await screen.findByRole('button', { name: 'Create a new list' });
    expect(addNewListButton).toBeInTheDocument();

    UserEvent.click(addNewListButton);

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
