import { createStore, applyMiddleware } from 'redux'; // v3.0.2
import thunkMiddleware from 'redux-thunk';

import { fetchUsers } from './actions.jsx';
import reducer from './reducers.jsx';

// create store
export const store = applyMiddleware(thunkMiddleware)(createStore)(reducer);