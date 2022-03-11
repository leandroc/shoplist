import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { useLists } from '../hooks/useLists';

import { EmptyList } from '../components/EmptyList';
import { ListSearch } from '../components/ListSearch';
import { List } from '../components/List';

function HomeComponent() {
  const [data, loading, error] = useLists();
  const navigate = useNavigate();

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
        <ListSearch onClick={() => navigate('/list')} />
      </div>

      <List
        data={data.map((item) => ({
          key: item.uid,
          name: item.name,
          sub: `Created at ${item.createdAt} | Total: $${item.totalValue}`,
        }))}
        onClick={(item) => navigate(`/list/${item.key}`)}
      />
    </Container>
  );
}

export const Home = HomeComponent;
