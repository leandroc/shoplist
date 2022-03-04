import React from 'react';
// import Container from 'react-bootstrap/Container';

import { Header } from './Header';

function LayoutComponent({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}

export const Layout = LayoutComponent;
