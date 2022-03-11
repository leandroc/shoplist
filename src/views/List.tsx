import {Navigate} from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useListCreate } from '../hooks/useListCreate';

function ListComponent() {

  const [mutate, { data, loading, error }] = useListCreate();

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutate({
      name: 'LISTA AQUI',
    });
  };

  if (loading) {
    return <>carregando...</>;
  }

  if (error) {
    return <>ocorreu um erro</>;
  }

  if (data?.uid) {
    return <Navigate to={`/list/${data.uid}`} />
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group controlId="list.name">
        <Form.Label>List name</Form.Label>
        <Form.Control placeholder="Enter list name" />
      </Form.Group>

      <Button type="submit">Save</Button>
    </Form>
  );
}

export const List = ListComponent;
