import { UPDATE_EVENTS } from '../constants/index.jsx';

export default function events (state, action) {
  if (typeof state === 'undefined') {
    state = [];
  }

  if (action.type === UPDATE_EVENTS) {
    console.log('reducer update events', action.events);
    return action.events;
  }
  else {
    return state;
  }
}