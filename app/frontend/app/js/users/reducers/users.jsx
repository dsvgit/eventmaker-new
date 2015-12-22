import { UPDATE_USERS } from '../constants/index.jsx';

export default function users (state, action) {
  if (typeof state === 'undefined') {
    state = [];
  }

  if (action.type === UPDATE_USERS) {
    console.log('reducer update users', action.users);
    return action.users;
  }
  else {
    return state;
  }
}