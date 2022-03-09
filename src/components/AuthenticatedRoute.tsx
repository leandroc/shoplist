import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useUserContext } from '../contexts/UserContext';

export type AuthenticatedRouteProps = {
  children?: JSX.Element;
};

type AuthenticatedRouteComponentProps = AuthenticatedRouteProps;

function AuthenticatedRouteComponent({ children }: AuthenticatedRouteComponentProps) {
  const location = useLocation();
  const { user, loading, error } = useUserContext();

  if (loading) {
    return <>Carregando...</>;
  }

  if (error) {
    return <>Ocorreu um erro!</>;
  }

  if (!user) {
    return <Navigate replace state={{ from: location }} to={{ pathname: '/login' }} />;
  }

  return children || <Outlet />;
}

export const AuthenticatedRoute = AuthenticatedRouteComponent;
