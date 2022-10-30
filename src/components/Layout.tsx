import React from 'react';
import Header from './shared/Header';
import Footer from './shared/Header';

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ( { children } : LayoutProps ) => {
  return (
    <>
      <Header />
      <div className='container mx-auto'>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;