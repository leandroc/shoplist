import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';

import { Routes } from './Routes';

function AppComponent() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export const App = AppComponent;
