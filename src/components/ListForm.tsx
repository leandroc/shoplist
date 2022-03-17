import { useForm } from 'react-hook-form';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ListInput, ItemInput } from '../types';

import { ItemForm } from './ItemForm';

type FormValues = {
  list?: ListInput | null;
  items?: ItemInput[] | null;
};

export type ListFormProps = FormValues & { onSubmit?: (values: Required<FormValues>) => void };

function ListFormComponent({ list, items, onSubmit }: ListFormProps) {
  const { register, watch, getValues, setValue } = useForm<Required<FormValues>>({
    defaultValues: {
      list: list || { name: '' },
      items: items || [],
    },
  });

  const handleOnSubmit = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (onSubmit) {
      const values = getValues();

      return onSubmit(values);
    }
  };

  const itemsList = watch('items') || [];

  return (
    <>
      <Form.Group controlId="list.name" className="pt-3 pb-3">
        <Form.Label>List name</Form.Label>
        <Form.Control {...register('list.name')} placeholder="Enter list name" />
      </Form.Group>

      <hr />

      <fieldset>
        <legend>Items</legend>

        <ul className="list-unstyled">
          {itemsList.map((item) => (
            <li key={item.name} className="pb-3">{item.name}</li>
          ))}

          <li>
            <ItemForm onSubmit={(value) => setValue(`items.${itemsList.length}`, value)} />
          </li>
        </ul>
      </fieldset>

      <div className="d-flex">
        <div className="ms-auto">
          <Button disabled={!onSubmit} onClick={handleOnSubmit}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}

export const ListForm = ListFormComponent;
