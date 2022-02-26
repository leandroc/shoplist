import React from 'react';

import { Routes as ReactRouterDomRoutes, Route } from 'react-router-dom';

import { AuthenticatedRoute } from './components/AuthenticatedRoute';

import { Login } from './views/Login';
import { Home } from './views/Home';

function RoutesComponent() {
  return (
    <ReactRouterDomRoutes>
      <Route
        path="/"
        element={
          <AuthenticatedRoute>
            <Home />
          </AuthenticatedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </ReactRouterDomRoutes>
  );
}

export const Routes = RoutesComponent;
