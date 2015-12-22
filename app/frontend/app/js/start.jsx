import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHistory } from 'history';

import { ROUTE } from './route/constatnts/index.jsx';
import { createRouteAction } from './route/actions/index.jsx';
import { store } from './store.jsx';
import { Home } from './home.jsx';
import UsersCreateForm from './users/components/UserCreateForm.jsx';
import UsersModule from './users/components/UsersModule.jsx';
import UserProfile from './users/components/UserProfile.jsx';
import UserPage from './users/components/UserPage.jsx';
import EventsModule from './events/components/EventsModule.jsx';
import EventCard from './events/components/EventCard.jsx';
import EventCardEdit from './events/components/EventCardEdit.jsx';
import Tabs from 'app/js/route/components/Tabs.jsx';
import Login from './login/components/Login.jsx';
import initConfig from './config.jsx';

import { api } from 'app/js/utils/url.jsx';

initConfig();

var history = createHistory();

function createStoreHistory () {
  return {
    listen: function (callback) {
      const unsubscribe = store.subscribe(function () {
        const route = store.getState().route;
        callback(route);
      });

      return unsubscribe;
    },
    createHref: history.createHref,
    pushState: history.pushState
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={createStoreHistory()}>
      <Route path="/" component={Tabs}>
        <IndexRoute component={Home}/>
        <Route path="/users" component={UsersModule}/>
        <Route path="/users/create" component={UsersCreateForm} />
        <Route path="/profile" component={UserProfile}/>
        <Route path="/user/:userID" component={UserPage}/>
        <Route path="/events" component={EventsModule}/>
        <Route path="/event/:eventID" component={EventCard}/>
        <Route path="/event/edit/:eventID" component={EventCardEdit}/>
      </Route>
      <Route path="/login" component={Login}/>
    </Router>
  </Provider>,
  document.getElementById('wrap')
);

const unlisten = history.listen(function (location) {
  store.dispatch(createRouteAction(location));
});