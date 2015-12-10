import { combineReducers } from 'redux';

import route from './route/reducers/index.jsx';
import users from './users/reducers/index.jsx';
import events from './events/reducers/events.jsx';
import event from './events/reducers/event.jsx';

export default function reducer(state = {}, action) {
  return {
    route: route(state.route, action),
    users: users(state.users, action),
    events: events(state.events, action),
    event: event(state.event, action)
  };
}