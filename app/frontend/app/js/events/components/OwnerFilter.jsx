import React from 'react';
import { connect } from 'react-redux';

import { filterEventsByOwner } from '../actions/index.jsx';

class OwnerFilter extends React.Component {

  handleClick(filter, e) {
    console.log('try filter events ', filter);
    this.props.dispatch(filterEventsByOwner(filter));
  }

  render() {
    return (
      <div className="events-owner-filter-main">
        <a href="#" onClick={this.handleClick.bind(this, 0)}>all </a>
        <a href="#" onClick={this.handleClick.bind(this, 1)}>my own </a>
        <a href="#" onClick={this.handleClick.bind(this, 2)}>invites </a>
      </div>
    );
  }
}


function selectEvents(state) {
  return {
    events: state.events
  };
}

export default connect(selectEvents)(OwnerFilter);