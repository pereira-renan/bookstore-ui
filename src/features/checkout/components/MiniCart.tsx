import { Button, Tooltip, IconButton } from '@mui/material';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals, clearCart, removeFromCart } from '../../../stores/reducer/shoppingCartReducer';
import { Link as RouterLink } from 'react-router-dom';
import { CartItem } from '@/types/Interfaces';
import styles from './MiniCart.module.scss';
import MiniCartItem from './MiniCart-item';

export default function MiniCart(): JSX.Element {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.shoppingCartReducer);
  useSelector((state: any) => console.log(state));
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <>
      <div className={styles.checkout_header}>Shopping Cart ({cart?.cartTotalQuantity})</div>
      {cart?.cartTotalQuantity == 0 ? (
        <div className={styles.empty_cart}>
          <p>There is no books in your cart!</p>
          <p>Why dont you try reading something new today?</p>
        </div>
      ) : (
        <>
          <div className={styles.checkout_container}>
            {cart?.cartItems?.map((cartItem: CartItem) => (
              <MiniCartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>
          {cart?.cartItems?.cartTotalAmount}
          <div className={styles.total}>
            <div style={{ width: '100%' }}>
              <div>Subtotal:</div>
              <span style={{ fontWeight: 'bold' }}>R$ {cart?.cartTotalAmount}</span>
            </div>
            <Link component={RouterLink} to="/checkout" underline="none">
              <Button
                type="submit"
                className={styles.checkout_button}
                variant="contained"
                sx={{ bgcolor: 'secondary.main', color: 'white' }}
                value="Submit"
              >
                Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
