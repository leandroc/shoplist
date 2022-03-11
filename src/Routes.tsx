import React from 'react';

import { Routes as ReactRouterDomRoutes, Route } from 'react-router-dom';

import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { Layout } from './components/Layout';

import { List } from './views/List';
import { Login } from './views/Login';
import { Home } from './views/Home';

function RoutesComponent() {
  return (
    <ReactRouterDomRoutes>
      <Route path="/" element={<AuthenticatedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/list/:listId" element={<List />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<>404</>} />
    </ReactRouterDomRoutes>
  );
}

export const Routes = RoutesComponent;
