import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
        <Form.Group controlId="list.name" className="pt-3 pb-3">
          <Form.Label>List name</Form.Label>
          <Form.Control {...register('list.name')} placeholder="Enter list name" />
        </Form.Group>

        <div className="d-flex">
          <div className="ms-auto">
            <Button type="submit">Create</Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export const Create = CreateComponent;
