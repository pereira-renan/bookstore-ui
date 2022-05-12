import React from 'react';

import styles from './MiniCart-item.module.scss';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch } from 'react-redux';
import { addToCart, decreaseCart, removeFromCart } from '@/stores/reducer/shoppingCartReducer';
import { useNavigate } from 'react-router-dom';
import { setBookData } from '@/stores/reducer/bookReducer';

const MiniCartItem: any = ({ cartItem }: any) => {
  const dispatch = useDispatch();
  const { volumeInfo, cartQuantity, id, saleInfo } = cartItem;

  function handleCartDecrease() {
    cartQuantity == 1 ? dispatch(removeFromCart(cartItem)) : dispatch(decreaseCart(cartItem));
  }

  function handleCartIncrease() {
    dispatch(addToCart(cartItem));
  }

  const navigate = useNavigate();
  const routeChange = () => {
    dispatch(setBookData(cartItem));
    const path = `/books/view/${cartItem.bookId}`;
    navigate(path);
  };

  return (
    <div className={styles.MiniCart_item_container}>
      <div className={styles.image_container}>
        <img
          src={volumeInfo.imageLinks.thumbnail}
          className={styles.image}
          onClick={() => routeChange()}
        />
      </div>
      <div className={styles.data_container}>
        <span className={styles.name}>{volumeInfo?.title}</span>
        <br />

        <div className={styles.quantity}>
          <RemoveCircleOutlineIcon
            sx={{ width: '18px', color: 'green', cursor: 'pointer' }}
            onClick={() => handleCartDecrease()}
          />
          <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>{cartQuantity}</div>
          <AddCircleOutlineIcon
            sx={{ width: '18px', color: 'green', cursor: 'pointer' }}
            onClick={() => handleCartIncrease()}
          />
        </div>
        <div className={styles.price}>
          R$ {(saleInfo?.listPrice?.amount * cartQuantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default MiniCartItem;
