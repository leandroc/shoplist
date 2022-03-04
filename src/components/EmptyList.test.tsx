import React from 'react';
import { render, screen } from '@testing-library/react';

// import { signInTestUser } from '../setupTests';

import { EmptyList } from './EmptyList';

const renderComponent = () => {
  render(<EmptyList />);
};

describe('<EmptyList />', () => {
  test('should render the component', async () => {
    // await signInTestUser();

    renderComponent();

    const titleElement = await screen.findByText(/Nothing here :\//i);
    expect(titleElement).toBeInTheDocument();

    const logoutButton = await screen.findByRole('button', { name: /Start with a new list/i });
    expect(logoutButton).toBeInTheDocument();
  });
});
