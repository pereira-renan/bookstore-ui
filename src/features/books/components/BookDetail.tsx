import { API_URL } from '@/config';
import { eraseBookData } from '@/stores/reducer/bookReducer';
import Link from '@mui/material/Link';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './BookDetail.module.scss';
import { Link as RouterLink } from 'react-router-dom';
import DefaultButton from '@/components/Elements/Button/Button';
import { addToCart } from '@/stores/reducer/shoppingCartReducer';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

export default function BookDetail({ book }: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookData, setBookData] = useState<any>();

  useEffect(() => {
    function callApi() {
      axios
        .get(`${API_URL}/Books/${id}`)
        .then((res) => {
          setBookData(res.data);
        })
        .catch(() => {
          navigate('/404');
        });
    }
    if (book.bookId != id) {
      callApi();
    } else {
      setBookData(book);
    }
  }, []);
  const publishedDate = (bookData?.volumeInfo.publishedDate || '').split('-');
  return (
    <div className={styles.bookDetail__container}>
      <div className={styles.bookDetail__div}>
        <div className={styles.bookDetail_top__container}>
          <div className={styles.bookDetail_info__container}>
            <div className={styles.bookDetail_thumbnail__container}>
              <img
                className={styles.bookDetail_thumbnail__image}
                src={bookData?.volumeInfo.imageLinks.thumbnail}
                alt="book"
              />
            </div>
            <div className={styles.bookDetail_info__div}>
              <div>
                <div className={styles.bookDetail_title__text}>{bookData?.volumeInfo.title}</div>
                <div className={styles.bookDetail_subtitle__text}>
                  {bookData?.volumeInfo.subtitle}
                </div>
                <div className={styles.bookDetail_publisher__text}>
                  {bookData?.volumeInfo.publisher && (
                    <>
                      {bookData?.volumeInfo.publisher} ({publishedDate[0]})
                    </>
                  )}
                </div>
                {bookData?.volumeInfo.averageRating == null ? (
                  <>
                    <div className={styles.bookDetail_ratings__stars}>
                      <Box>
                        <Rating name="read-only" value={0} readOnly sx={{ fontSize: '2rem' }} />
                      </Box>
                    </div>
                    <div>Not yet rated</div>
                  </>
                ) : (
                  <>
                    <div className={styles.bookDetail_ratings__stars}>
                      <Rating
                        name="read-only"
                        value={bookData.volumeInfo.averageRating}
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                        sx={{ fontSize: '2rem' }}
                      />
                      ({bookData.volumeInfo.averageRating} | {bookData.volumeInfo.ratingsCount}{' '}
                      ratings)
                    </div>
                  </>
                )}
              </div>
              <div className={styles.bookDetail_payment__container}>
                <p>
                  Available as: {bookData?.volumeInfo.printType == 'BOOK' ? 'Physical' : 'Digital'}{' '}
                  Copy
                </p>
                {bookData?.saleInfo.saleability == 'FOR_SALE' ? (
                  <>
                    <div className={styles.bookDetail_CTA__container}>
                      {bookData?.saleInfo.listPrice != null && (
                        <div className={styles.bookDetail_price__text}>
                          R$ {bookData?.saleInfo.listPrice.amount}
                        </div>
                      )}
                      <div onClick={() => dispatch(addToCart(bookData))}>
                        <DefaultButton text="Add to cart" />
                      </div>
                    </div>
                  </>
                ) : (
                  'Not for sale'
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bookDetail_middle__container}>
          <div className={styles.bookDetail_Description__container}>
            <label>Description</label>
            <br />
            <p>{bookData?.volumeInfo.description}</p>
          </div>
          <div className={styles.bookDetail_AuthorCategoryPages__container}>
            <div>
              <label>Author</label> <p>Walter Isaacson</p>
            </div>
            <div>
              <label>Category</label> <p> Fantasy</p>
            </div>
            <div>
              <label>Total Pages</label> <p> {bookData?.volumeInfo.pageCount} </p>
            </div>
          </div>
          <div className={styles.bookDetail_MaturityLanguage__container}>
            <div>
              <label>Maturity Rating</label>
              <p>{bookData?.volumeInfo.maturityRating == 'NOT_MATURE' ? 'Not Mature' : 'Mature'}</p>
            </div>
            <div>
              <label>Language</label> <p> {bookData?.volumeInfo.language} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
