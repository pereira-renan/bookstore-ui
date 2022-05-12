import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = { cartItems: [], cartTotalQuantity: 0, cartTotalAmount: 0 };

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };

        toast.success('Another unit added to cart', {
          position: 'bottom-left',
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success('New book added to cart', {
          position: 'bottom-left',
        });
      }
      state.cartTotalQuantity += 1;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        state.cartTotalQuantity -= 1;
        toast.warn('Volume removed from cart', {
          position: 'bottom-left',
        });
      } else if (state.cartItems[itemIndex].cartQuantity <= 1) {
        return;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        console.log(JSON.stringify(cartItem));
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter((item) => item.id !== cartItem.id);
          state.cartItems = nextCartItems;
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        return state;
      });

      toast.warn('Book removed from cart', {
        position: 'bottom-left',
      });
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          let itemTotal = 0;
          const { saleInfo, cartQuantity } = cartItem;
          if (saleInfo != null) {
            itemTotal = saleInfo.listPrice.amount * cartQuantity;
          } else {
            itemTotal = 10 * cartQuantity;
          }

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;

      toast.error('Your cart has been cleared', {
        position: 'bottom-center',
      });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
