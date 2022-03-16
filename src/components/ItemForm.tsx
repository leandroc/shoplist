import { useForm } from 'react-hook-form';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ItemInput } from '../types';
import React from 'react';

export type ItemFormProps = {
  item?: ItemInput;
  onSubmit?: (values: ItemInput) => void;
};

function ItemFormComponent({ item, onSubmit }: ItemFormProps) {
  const { register, getValues } = useForm<ItemInput>({
    defaultValues: item || {},
  });

  const handleOnSubmit = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (onSubmit) {
      const values = getValues();

      return onSubmit(values);
    }
  };

  return (
    <>
      <Form.Group controlId="name">
        <Form.Label>Item name</Form.Label>
        <Form.Control {...register('name')} placeholder="Enter item name" />
      </Form.Group>

      <Form.Group controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control {...register('quantity')} type="number" placeholder="Enter item quantity" />
      </Form.Group>

      <Form.Group controlId="value">
        <Form.Label>Value</Form.Label>
        <Form.Control {...register('value')} placeholder="Enter item value" />
      </Form.Group>

      <div className="d-flex">
        <div className="ms-auto">
          <Button disabled={!onSubmit} onClick={handleOnSubmit}>
            Add to list
          </Button>
        </div>
      </div>
    </>
  );
}

export const ItemForm = ItemFormComponent;
