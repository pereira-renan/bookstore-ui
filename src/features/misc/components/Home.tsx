import { API_URL } from '@/config';
import BookCard from '@/features/books/components/BookCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/Api/Books`).then((res) => {
      setBooks(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className={styles.home__container}>
      <div className={styles.bookHorizontalDisplay_heading}> Recently Added</div>
      <div className={styles.bookHorizontalDisplay__container}>
        <div className={styles.bookHorizontalDisplay_listing__container}>
          {books.map((bookData: Response) => (
            <BookCard bookData={bookData} key={bookData} />
          ))}
        </div>
      </div>
      <div className={styles.bookGridDisplay_heading}> Recommended For You</div>
      <div className={styles.bookGridDisplay__container}>
        <div className={styles.bookGridDisplay_listing__container}>
          {books.map((bookData: Response) => (
            <BookCard bookData={bookData} key={bookData} />
          ))}
        </div>
      </div>
    </div>
  );
}
