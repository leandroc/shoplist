import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import faker from '@faker-js/faker';

// import {
//   AllProviders,

//   // logout
// } from '../setupTests';

import { ItemForm, ItemFormProps } from './ItemForm';

const renderComponent = (props: ItemFormProps) => {
  render(<ItemForm {...props} />);
};

const delay = async (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

describe('<ItemForm />', () => {
  test('should render the component', async () => {
    const mockOnClick = jest.fn();

    renderComponent({ onSubmit: mockOnClick });

    const nameInput = await screen.findByRole('textbox', { name: /Item name/i });
    expect(nameInput).toBeInTheDocument();

    const quantityInput = await screen.findByRole('spinbutton', { name: /Quantity/i });
    expect(quantityInput).toBeInTheDocument();

    const valueInput = await screen.findByRole('textbox', { name: /Value/i });
    expect(valueInput).toBeInTheDocument();

    const createButton = await screen.findByRole('button', { name: 'Add to list' });
    expect(createButton).toBeInTheDocument();

    UserEvent.click(createButton);

    // expect was failing because jest
    // https://stackoverflow.com/questions/54890916/jest-fn-claims-not-to-have-been-called-but-has
    await delay(0);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('should receive the values from props', async () => {
    const MOCK_ITEM = {
      name: faker.commerce.productName(),
      quantity: faker.datatype.number(),
      value: faker.datatype.float(),
    };

    renderComponent({ item: MOCK_ITEM });

    const nameInput = await screen.findByRole('textbox', { name: /Item name/i });
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue(MOCK_ITEM.name);

    const quantityInput = await screen.findByRole('spinbutton', { name: /Quantity/i });
    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toHaveValue(MOCK_ITEM.quantity);

    const valueInput = await screen.findByRole('textbox', { name: /Value/i });
    expect(valueInput).toBeInTheDocument();
    // TODO: fix in input
    expect(valueInput).toHaveValue(`${MOCK_ITEM.value}`);
  });
});
