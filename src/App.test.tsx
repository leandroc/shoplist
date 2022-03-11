import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import { signInEmptyUser, signInReadUser, signInCreateUser } from './setupTests';

import { App } from './App';

const renderComponent = () => {
  return render(<App />);
};

describe('<App />', () => {
  test('should render the login route', async () => {
    renderComponent();

    await screen.findByText(/carregando.../i);

    const signInTitle = await screen.findByRole('heading', { name: /Sign in/i });
    expect(signInTitle).toBeInTheDocument();
  });

  test('should render the home route with no content', async () => {
    await signInEmptyUser();

    renderComponent();

    await screen.findByText(/carregando.../i);

    const appTitle = await screen.findByText(/Shoplist/i);
    expect(appTitle).toBeInTheDocument();

    await screen.findByText(/carregando.../i);

    const createButton = await screen.findByRole('button', { name: /Start with a new list/i });
    expect(createButton).toBeInTheDocument();
  });

  test('should render the home route with a list', async () => {
    await signInReadUser();

    renderComponent();

    await screen.findByText(/carregando.../i);

    const appTitle = await screen.findByText(/Shoplist/i);
    expect(appTitle).toBeInTheDocument();

    await screen.findByText(/carregando.../i);

    const createButton = await screen.findByRole('button', { name: /Create a new list/i });
    expect(createButton).toBeInTheDocument();

    const listItem = await screen.findByText(/List to read/i);
    expect(listItem).toBeInTheDocument();
  });

  test('should render the list route', async () => {
    await signInCreateUser();

    renderComponent();

    await screen.findByText(/carregando.../i);

    const appTitle = await screen.findByText(/Shoplist/i);
    expect(appTitle).toBeInTheDocument();

    await screen.findByText(/carregando.../i);

    const createButton = await screen.findByRole('button', { name: /Create a new list/i });
    expect(createButton).toBeInTheDocument();

    UserEvent.click(createButton);

    await screen.findByRole('textbox', { name: /List name/i });
  });
});
