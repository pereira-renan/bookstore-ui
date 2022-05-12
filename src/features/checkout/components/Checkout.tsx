import { AuthContext } from '@/providers/AuthContext';
import { Box, Button, Card, CardContent, Container, IconButton, Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals, clearCart, removeFromCart } from '../../../stores/reducer/shoppingCartReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
import styles from './Checkout.module.scss';
import CheckoutItem from './Checkout-item';
import { CartItem } from '@/types/Interfaces';
import { Link as RouterLink } from 'react-router-dom';
export default function Checkout() {
  const dispatch = useDispatch();
  const itens = 0;
  const cartTotal = 0;
  const cart = useSelector((state: any) => state.shoppingCartReducer);
  useSelector((state: any) => console.log(state));
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const empty = cart?.cartItems?.length === 0;

  const handleRemoveFromCart = (product: CartItem) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  {
    if (empty) {
      return (
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '900px',
            minWidth: '50%',
          }}
        >
          <div className={styles.checkout_empty_container}>
            <h1>Your cart is empty</h1>
            <Link component={RouterLink} to="/" underline="none">
              <Button
                variant="contained"
                sx={{ bgcolor: 'secondary.main', color: 'white' }}
                value="Submit"
              >
                Check our books
              </Button>
            </Link>
          </div>
        </Box>
      );
    } else {
      return (
        // <Container component="main" maxWidth="xs"> <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <Card variant="outlined" sx={{ maxWidth: 1275 }}>
            {' '}
            <CardContent>
              <div className={styles.checkout_header}>
                <div className={styles.checkout_header__text}>
                  Shopping Cart ({cart?.cartTotalQuantity})
                </div>
                <div>
                  <Tooltip placement="left-end" title="Clear cart?">
                    <IconButton onClick={() => handleClearCart()}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className={styles.checkout_container}>
                {cart?.cartItems?.map((cartItem: any) => (
                  <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </div>
              <span className={styles.total}>
                <div>
                  Subtotal: <b>R${cart?.cartTotalAmount}</b>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    ml: 4,
                    bgcolor: 'secondary.main',
                    color: 'white',
                  }}
                  value="Submit"
                >
                  Continue Order
                </Button>
              </span>
            </CardContent>{' '}
          </Card>
        </Box>
      );
    }
  }
}
