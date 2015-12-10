import { ROUTE } from '../constatnts/index.jsx';

export default function route (state, action) {
  if (action.type === ROUTE) {
    return action.payload;
  }
  else {
    return state;
  }
}