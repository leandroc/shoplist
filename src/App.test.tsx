import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

const renderComponent = () => {
  return render(<App />);
};

describe('<App />', () => {
  test('should render the component and show loading state', async () => {
    renderComponent();

    const linkElement = await screen.findByText(/carregando.../i);
    expect(linkElement).toBeInTheDocument();
  });
});
