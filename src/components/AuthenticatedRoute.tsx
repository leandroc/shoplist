import { Navigate, useLocation } from 'react-router-dom';

import { useUserContext } from '../contexts/UserContext';

import { Layout } from './Layout';

export type AuthenticatedRouteProps = {
  children: JSX.Element;
};

type AuthenticatedRouteComponentProps = AuthenticatedRouteProps;

function AuthenticatedRouteComponent({ children }: AuthenticatedRouteComponentProps) {
  const location = useLocation();
  const { user, loading, error } = useUserContext();

  if (loading) {
    return <Layout>Carregando...</Layout>;
  }

  if (error) {
    console.log('error', error);

    return <Layout>Ocorreu um erro!</Layout>;
  }

  if (!user) {
    return <Navigate replace state={{ from: location }} to={{ pathname: '/login' }} />;
  }

  return <Layout>{children}</Layout>;
}

export const AuthenticatedRoute = AuthenticatedRouteComponent;
