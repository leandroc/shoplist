import Container from 'react-bootstrap/Container';

import { useLists } from '../hooks/useLists';

import { EmptyList } from '../components/EmptyList';
import { ListSearch } from '../components/ListSearch';
import { List } from '../components/List';

function HomeComponent() {
  const [data, loading, error] = useLists();

  if (loading) {
    return <>Carregando...</>;
  }

  if (error) {
    return <>ocorreu um erro</>;
  }

  if (!data || (data || []).length < 1) {
    return <EmptyList />;
  }

  return (
    <Container fluid>
      <div className="pt-3 pb-3">
        <ListSearch />
      </div>

      <List
        data={data.map((item) => ({
          key: item.uid,
          name: item.name,
          sub: `Created at ${item.createdAt} | Total: $${item.totalValue}`,
        }))}
        onClick={(item) => console.log('clicou', item)}
      />
    </Container>
  );
}

export const Home = HomeComponent;
