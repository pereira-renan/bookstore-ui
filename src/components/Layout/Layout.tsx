import React, { FC } from 'react';
import Navbar from '../Elements/Header/Navbar';

const Layout: FC = ({ children }) => (
  <>
    <header>
      <Navbar />
    </header>
    <main>{children}</main>
  </>
);

export default Layout;
