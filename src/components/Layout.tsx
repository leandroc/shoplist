import React from 'react';
import { Outlet } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';

import { Header } from './Header';

function LayoutComponent({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Header />

      {children || <Outlet />}
    </>
  );
}

export const Layout = LayoutComponent;
