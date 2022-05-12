import React, { FC } from 'react';
import Navbar from '../Elements/Header/Navbar';
import LeftSidebar from '../LeftSidebar';
import styles from './LayoutWithSidebar.module.scss';
import RightSidebar from '../RightSidebar';

const Layout: FC = ({ children }) => (
  <>
    <header>
      <Navbar />
    </header>
    <div>
      <main className={styles.layoutWithSidebar__body}>
        <LeftSidebar />
        {children}
        <RightSidebar />
      </main>
    </div>
  </>
);

export default Layout;
