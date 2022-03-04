import { Navigate, useLocation } from 'react-router-dom';

import { useUserContext } from '../contexts/UserContext';

import { EmptyList } from '../components/EmptyList';

function HomeComponent() {
  const location = useLocation();
  const { user } = useUserContext();

  if (!user) {
    return <Navigate replace state={{ from: location }} to={{ pathname: '/login' }} />;
  }

  return <EmptyList />;
}

export const Home = HomeComponent;
