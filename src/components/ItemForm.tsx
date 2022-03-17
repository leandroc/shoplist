import { useForm } from 'react-hook-form';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    <div className="bg-light border p-3 rounded-2">
      <Row className="align-items-end">
        <Col xs={12} md={6} lg={8}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Item name</Form.Label>
            <Form.Control {...register('name')} placeholder="Enter name" />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={3} lg={2}>
          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control {...register('quantity')} type="number" placeholder="9" />
          </Form.Group>
        </Col>

        <Col xs={12} sm={6} md={3} lg={2}>
          <Form.Group className="mb-3" controlId="value">
            <Form.Label>Value</Form.Label>
            <Form.Control {...register('value')} placeholder="9.99" />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex">
        <div className="ms-auto">
          <Button className="mb-3" disabled={!onSubmit} onClick={handleOnSubmit}>
            Add to list
          </Button>
        </div>
      </div>
    </div>
  );
}

export const ItemForm = ItemFormComponent;
