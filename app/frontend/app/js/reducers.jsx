import { combineReducers } from 'redux';

import route from './route/reducers/index.jsx';
import users from './users/reducers/users.jsx';
import currentUser from './users/reducers/currentUser.jsx';
import user from './users/reducers/user.jsx';
import events from './events/reducers/events.jsx';
import event from './events/reducers/event.jsx';

export default function reducer(state = {}, action) {
  return {
    route: route(state.route, action),
    users: users(state.users, action),
    currentUser: currentUser(state.currentUser, action),
    events: events(state.events, action),
    event: event(state.event, action),
    user: user(state.user, action)
  };
}