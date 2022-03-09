import React from 'react';
import { render, screen, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

// import {
//   AllProviders,

//   // logout
// } from '../setupTests';

import { List, ListProps } from './List';

const renderComponent = ({ props }: { props: ListProps } = { props: { data: [] } }) => {
  render(<List {...props} />);
};

describe('<List />', () => {
  test('should render the component without edit button', async () => {
    const data = [
      {
        key: 1,
        name: 'List A',
        sub: 'Created at 20/09/1987',
      },
      {
        key: 2,
        name: 'List 2',
        sub: 'Created at 20/09/1987',
      },
      {
        key: 3,
        name: 'List C',
        sub: 'Created at 20/09/1987',
      },
    ];

    renderComponent({ props: { data } });

    const list = await screen.findByRole('list', { name: /your lists/i });
    const items = within(list).getAllByRole('listitem');
    expect(items.length).toBe(data.length);

    items.forEach(async (item, index) => {
      const { getByText, queryByRole } = within(item);

      const itemData = data[index];

      getByText(itemData.name);

      const editButton = queryByRole('button', { name: /edit/i });
      expect(editButton).not.toBeInTheDocument();
    });
  });

  test('should render the component with', async () => {
    const onClickSpy = jest.fn();

    const data = [
      {
        key: 1,
        name: 'List A',
        sub: 'Created at 20/09/1987',
      },
      {
        key: 2,
        name: 'List 2',
        sub: 'Created at 20/09/1987',
      },
      {
        key: 3,
        name: 'List C',
        sub: 'Created at 20/09/1987',
      },
    ];

    renderComponent({ props: { data, onClick: onClickSpy } });

    const list = await screen.findByRole('list', { name: /your lists/i });
    const items = within(list).getAllByRole('listitem');
    expect(items.length).toBe(data.length);

    items.forEach((item, index) => {
      const { getByText, getByRole } = within(item);

      const itemData = data[index];

      getByText(itemData.name);

      const editButton = getByRole('button', { name: /edit/i });
      UserEvent.click(editButton);
    });

    expect(onClickSpy).toHaveBeenCalledTimes(3);
  });
});
