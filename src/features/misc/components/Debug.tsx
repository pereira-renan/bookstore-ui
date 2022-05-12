import { decrement, increment } from '@/stores/reducer/counterReducer';
import { loginUser, loggoutUser } from '@/stores/reducer/authReducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/stores/reducer/shoppingCartReducer';
export interface IRootState {
  allReducers: {
    counterReducer: number;
    auth: boolean;
  };
}

function Debug() {
  const dispatch = useDispatch();
  const counter = useSelector((state: any) => state.counterReducer);
  const auth = useSelector((state: any) => state.authReducer);
  const cart = useSelector((state: any) => state.shoppingCartReducer);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(loginUser())}>auth true</button>
      <button onClick={() => dispatch(loggoutUser())}>auth false</button>
      <button onClick={() => console.log(counter)}>Log Coutner</button>
      <button onClick={() => console.log(cart)}>Log Cart</button>
      <button onClick={() => dispatch(clearCart())}>Empty Cart</button>
      <h3>
        counter: {counter} | auth: {auth ? 'true' : 'false'}
      </h3>
    </div>
  );
}
export default Debug;
