import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';

import { searchEvents } from '../actions/index.jsx';

class Sidebar extends React.Component {

  handleChange(e) {
    var searchText = e.target.value;
    console.log(searchText);

    this.props.dispatch(searchEvents(searchText));
  }

  render() {
    return (
      <aside className="events-sidebar-filter" role="form">
        <label htmlFor="search">Find what you want: </label>
        <TextField floatingLabelText="search..." onChange={this.handleChange.bind(this)} />
      </aside>
    );
  }
}


function selectEvents(state) {
  return {
    events: state.events
  };
}

export default connect(selectEvents)(Sidebar);