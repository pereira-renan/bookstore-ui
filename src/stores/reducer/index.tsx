import { combineReducers } from 'redux';

import shoppingCartReducer from './shoppingCartReducer';
import authReducer from './authReducer';
import counterReducer from './counterReducer';
import bookReducer from './bookReducer';

const allReducers = combineReducers({
  counterReducer,
  shoppingCartReducer,
  authReducer,
  bookReducer,
});

export default allReducers;
