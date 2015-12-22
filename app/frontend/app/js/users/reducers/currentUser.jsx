import { UPDATE_CURRENT_USER } from '../constants/index.jsx';

export default function user (state, action) {
  if (typeof state === 'undefined') {
    state = {
      id: null,
      name: '',
      login: '',
      email: ''
    };
  }

  if (action.type === UPDATE_CURRENT_USER) {
    console.log('reducer update current user', action.user);
    return action.user;
  }
  else {
    return state;
  }
}