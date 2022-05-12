import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Elements/Button/Button';
import styles from './LeftSidebar.module.scss';

export default function LeftSidebar() {
  return <div className={styles.sidebar__container}> </div>;
}

/*
export default function LeftSidebar() {
  return (
    <div className={styles.sidebar__container}>
      <div className={styles.sidebar__div}>
        <div className={styles.sidebar_heading__div}>BROWSE</div>
        <div className={styles.sidebar_listing__div}>
          <ul>
            <Link to="">
              <li>Top Books</li>
            </Link>
            <Link to="">
              <li>Discover</li>
            </Link>
            <Link to="">
              <li>Categories</li>
            </Link>
          </ul>
        </div>

        <br />
        <div className={styles.sidebar_line__div} />
        <br />

        <div className={styles.sidebar_heading__div}>YOUR BOOKS</div>
        <div className={styles.sidebar_listing__div}>
          <ul>
            <Link to="">
              <li>Reading</li>
            </Link>
            <Link to="">
              <li>Favorite Reads</li>
            </Link>
            <Link to="">
              <li>History</li>
            </Link>
          </ul>
        </div>

        <br />
        <div className={styles.sidebar_line__div} />
        <br />

        <div className={styles.sidebar_heading__div}>SHELVES</div>
        <div className={styles.sidebar_listing__div}>
          <ul>
            <Link to="">
              <li>Your Shelves</li>
            </Link>
          </ul>
        </div>
        <br />
        <Button text="Create a Shelf" />
      </div>
    </div>
  );
}
*/
