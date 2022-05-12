import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookCard.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/stores/reducer/shoppingCartReducer';
import CircleIcon from '@mui/icons-material/Circle';
import InfoIcon from '@mui/icons-material/Info';
import { setBookData } from '@/stores/reducer/bookReducer';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function BookCard({ bookData }: any) {
  const [value, setValue] = React.useState<number | null>(2);
  const auth = useSelector((state: any) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routeChange = () => {
    dispatch(setBookData(bookData));
    const path = `/books/view/${bookData.bookId}`;
    navigate(path);
  };

  return (
    <div className={styles.bookCard__container}>
      <div className={styles.bookCard_thumbnail__container}>
        {bookData.volumeInfo.imageLinks && (
          <img
            className={styles.bookCard_thumbnail__image}
            src={bookData.volumeInfo.imageLinks.thumbnail}
            alt=""
            onClick={routeChange}
          />
        )}
        {auth && (
          <div className={styles.bookCard_shopping__container}>
            <div
              className={styles.bookCard_addToCart__button}
              onClick={() => dispatch(addToCart(bookData))}
            >
              <AddShoppingCartIcon
                sx={{ zIndex: '999', color: 'white', width: '24px', height: '24px' }}
              />
              <CircleIcon
                sx={{ position: 'absolute', color: '#43a047', width: '42px', height: '42px' }}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.bookCard_data__container} onClick={routeChange}>
        <div className={styles.bookCard_title__container}>
          <div className={styles.bookCard_title__text}>{bookData.volumeInfo.title}</div>
          <div className={styles.bookCard_author__text}>Walter Isaacson</div>
          <div className={styles.bookCard_ratings__container}>
            {bookData.volumeInfo.averageRating == null ? (
              <>
                <div className={styles.bookCard_ratings__stars}>
                  <Box>
                    <Rating name="read-only" value={0} readOnly />
                  </Box>
                </div>
                <div className={styles.bookCard_ratings__text}>Not yet rated</div>
              </>
            ) : (
              <>
                <div className={styles.bookCard_ratings__stars}>
                  <Rating
                    name="read-only"
                    value={bookData.volumeInfo.averageRating}
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <div className={styles.bookCard_ratings__text}>
                  {bookData.volumeInfo.ratingsCount} ratings
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
