import React from 'react';

import { Routes as ReactRouterDomRoutes, Route } from 'react-router-dom';

import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { Layout } from './components/Layout';

import { Login } from './views/Login';
import { Home } from './views/Home';

function RoutesComponent() {
  return (
    <ReactRouterDomRoutes>
      <Route path="/" element={<AuthenticatedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<>404</>} />
    </ReactRouterDomRoutes>
  );
}

export const Routes = RoutesComponent;
