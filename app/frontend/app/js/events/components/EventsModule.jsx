import React from 'react';

import ActionCreate from './ActionCreate.jsx';
import Sidebar from './Sidebar.jsx';
import OwnerFilter from './OwnerFilter.jsx';
import Events from './Events.jsx';

export default class EventsModule extends React.Component {
  render() {
    return (
      <div>
        <h1 className="common-main-header">Events</h1>
        <div className="events-actions-main">
          <ActionCreate />
        </div>
        <div className="events-main-screen">
          <Sidebar />
          <div className="events-main-list">
            <OwnerFilter />
            <Events />
          </div>
        </div>
      </div>
    );
  }
}