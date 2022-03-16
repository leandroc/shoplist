import { Navigate, useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { ListForm, ListFormProps } from '../components/ListForm';
import { useListEdit } from '../hooks/useListEdit';

function EditComponent() {
  const params = useParams();
  const [mutate, { list, items, loading, error }] = useListEdit(params.listId || '');

  const handleOnSubmit = async (values: NonNullable<Omit<ListFormProps, 'onSubmit'>>) => {
    console.log('submteu', values);
  };

  if (loading) {
    return <>carregando...</>;
  }

  if (!params.listId || error?.code === 'permission-denied') {
    return <Navigate to="/" />;
  }

  if (error) {
    return <>ocorreu um erro</>;
  }

  return (
    <Container fluid>
      <ListForm list={list} items={items} onSubmit={handleOnSubmit} />
    </Container>
  );
}

export const Edit = EditComponent;
