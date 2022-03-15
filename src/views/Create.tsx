import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useListCreate } from '../hooks/useListCreate';

type ListForm = {
  list: {
    name: string;
  };
};

function CreateComponent() {
  const [mutate, { data, loading, error }] = useListCreate();
  const { register, handleSubmit } = useForm<ListForm>({
    defaultValues: {
      list: { name: '' },
    },
  });

  const handleOnSubmit = async (values: ListForm) => {
    await mutate(values.list);
  };

  if (loading) {
    return <>carregando...</>;
  }

  if (error) {
    return <>ocorreu um erro</>;
  }

  if (data?.uid) {
    return <Navigate to={`/list/${data.uid}`} />;
  }

  return (
    <Container fluid>
      <Form onSubmit={handleSubmit((values) => handleOnSubmit(values))}>
        <Form.Group controlId="list.name">
          <Form.Label>List name</Form.Label>
          <Form.Control {...register('list.name')} placeholder="Enter list name" />
        </Form.Group>

        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
}

export const Create = CreateComponent;
