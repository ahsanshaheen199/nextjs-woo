import React from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
