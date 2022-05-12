import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from './Elements/Button/Button';
import styles from './RightSidebar.module.scss';
import Minicart from '../features/checkout/components/MiniCart';

export default function RightSidebar() {
  const auth = useSelector((state: any) => state.authReducer);
  return (
    <>
      {auth ? (
        <div className={styles.sidebar__container}>
          <div className={styles.sidebar__div}>
            <Minicart />
          </div>
        </div>
      ) : (
        <div className={styles.sidebar__container}>
          <div className={styles.sidebar__div}>
            <div className={styles.sidebar_heading__div}>New around here?</div>
            <p>Login to buy our books!</p>
          </div>
        </div>
      )}
    </>
  );
}
/*
export default function RightSidebar() {
  return (
    <>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar_heading__div}>YOUR FRIENDS</div>
        {friends.map((friend) => (
          <Friends friend={friend} key={friend.id} />
        ))}
        <br />
        <Button text="Friends List" />
      </div>
    </>
  );
}
*/
