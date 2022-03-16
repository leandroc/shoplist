import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import faker from '@faker-js/faker';

// import {
//   AllProviders,

//   // logout
// } from '../setupTests';

import { ListForm, ListFormProps } from './ListForm';

const renderComponent = (props: ListFormProps) => {
  render(<ListForm {...props} />);
};

const delay = async (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

describe('<ListForm />', () => {
  test('should render the component', async () => {
    const mockOnClick = jest.fn();

    renderComponent({ onSubmit: mockOnClick });

    screen.getByRole('textbox', { name: /List name/i });

    const createButton = screen.getByRole('button', { name: 'Create' });
    expect(createButton).toBeInTheDocument();

    screen.getByText(/Items/i);

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(1); // just the creation form

    UserEvent.click(createButton);

    // expect was failing because jest
    // https://stackoverflow.com/questions/54890916/jest-fn-claims-not-to-have-been-called-but-has
    await delay(0);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('should add an item to list', async () => {
    const MOCK_ITEM = {
      name: faker.commerce.productName(),
      quantity: faker.datatype.number(),
      value: faker.datatype.float(),
    };

    renderComponent({});

    const itemNameInput = screen.getByRole('textbox', { name: 'Item name' });
    UserEvent.clear(itemNameInput);

    const itemQuantityInput = screen.getByRole('spinbutton', { name: 'Quantity' });
    UserEvent.clear(itemQuantityInput);

    const itemValyeInput = screen.getByRole('textbox', { name: 'Value' });
    UserEvent.clear(itemValyeInput);

    const createButton = await screen.findByRole('button', { name: 'Add to list' });
    expect(createButton).toBeInTheDocument();

    UserEvent.type(itemNameInput, MOCK_ITEM.name);
    // TODO: fix in the component
    UserEvent.type(itemQuantityInput, `${MOCK_ITEM.quantity}`);
    UserEvent.type(itemValyeInput, `${MOCK_ITEM.value}`);

    UserEvent.click(createButton);

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(2); // the creation form + the new item

    expect(listItems[0]).toHaveTextContent(MOCK_ITEM.name)
  });
});
