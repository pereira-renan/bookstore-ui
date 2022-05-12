import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import styles from './Checkout-item.module.scss';
import { CartItem } from '@/types/Interfaces';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import {
  addToCart,
  decreaseCart,
  removeFromCart,
} from '../../../stores/reducer/shoppingCartReducer';
import { useNavigate } from 'react-router-dom';
import { setBookData } from '@/stores/reducer/bookReducer';

// eslint-disable-next-line react/prop-types
const CheckoutItem: any = ({ cartItem }: { cartItem: any }) => {
  // eslint-disable-next-line react/prop-types
  const { volumeInfo, cartQuantity, id } = cartItem;
  console.log('price: ', cartItem.saleInfo.price);
  const dispatch = useDispatch();
  const clearItemHandler = () => dispatch(removeFromCart(cartItem));
  const addItemHandler = () => dispatch(addToCart(cartItem));
  const removeItemHandler = () => dispatch(decreaseCart(cartItem));

  const navigate = useNavigate();
  const routeChange = () => {
    dispatch(setBookData(cartItem));
    const path = `/books/view/${cartItem.bookId}`;
    navigate(path);
  };

  return (
    <div className={styles.checkout_item_container}>
      <div className={styles.image_container}>
        <img
          src={volumeInfo.imageLinks.thumbnail}
          className={styles.image}
          alt={`${name}`}
          onClick={() => routeChange()}
        />
      </div>
      <div className={styles.name_section}>
        <div className={styles.name}>
          {volumeInfo.title}
          <br></br>
        </div>
        <div>
          <Button className={styles.remove_button} onClick={() => clearItemHandler()}>
            Remove book
          </Button>
        </div>
      </div>
      <span className={styles.quantity}>
        <div className={styles.quantity_buttons} onClick={() => removeItemHandler()}>
          <RemoveCircleIcon
            sx={{
              fontSize: '32px',
            }}
          />
        </div>
        <span className={styles.value}>{cartItem.cartQuantity}</span>
        <div className={styles.quantity_buttons} onClick={() => addItemHandler()}>
          <AddCircleIcon
            sx={{
              fontSize: '32px',
            }}
          />
        </div>
      </span>

      <span className={styles.price}>
        R$ {(cartItem.cartQuantity * cartItem.saleInfo?.listPrice.amount).toFixed(2)}
      </span>
    </div>
  );
};

export default CheckoutItem;
