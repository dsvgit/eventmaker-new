import { UPDATE_CURRENT_EVENT } from '../constants/index.jsx';

export default function event (state, action) {
  if (typeof state === 'undefined') {
    state = {
      id: null,
      name: '',
      date: null,
      desc: '',
      regs: []
    };
  }

  if (action.type === UPDATE_CURRENT_EVENT) {
    console.log('reducer update current event', action.event);
    var event = action.event;
    event.date = new Date(event.date);
    return action.event;
  }
  else {
    return state;
  }
}