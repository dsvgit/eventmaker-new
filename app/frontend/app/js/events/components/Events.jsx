import React from 'react';
import { connect } from 'react-redux';

import Event from './Event.jsx';
import { fetchEvents } from '../actions/index.jsx'

class Events extends React.Component {

  componentWillMount() {
    console.log('users component ComponentDidMount');
    this.props.dispatch(fetchEvents());
  }

  render() {
    console.log(this.props.events);
    var events = this.props.events.map(function(event, index) {
      return <Event key={event.id} event={event}/>;
    });
    return (
      <div>
        {events}
      </div>
    );
  }
}

function selectEvents(state) {
  return {
    events: state.events
  };
}

export default connect(selectEvents)(Events);