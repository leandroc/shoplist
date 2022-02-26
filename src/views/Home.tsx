import { Navigate, useLocation } from 'react-router-dom';

import { useUserContext } from '../contexts/UserContext';

function HomeComponent() {
  const location = useLocation();
  const { user, logout } = useUserContext();

  if (!user) {
    return <Navigate replace state={{ from: location }} to={{ pathname: '/login' }} />;
  }

  return (
    <>
      {user?.displayName}

      <button onClick={logout}>logout</button>
    </>
  );
}

export const Home = HomeComponent;
