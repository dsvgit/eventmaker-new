import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import { Link } from 'react-router';

export default class Event extends React.Component {
  render() {
    return (
      <Paper zDepth={1} className="events-event-main">
        <p>
          <Link className="common-tab-main" to={"/event/" + this.props.event.id}>
            <strong>{this.props.event.name}</strong>
          </Link>
          <small><em>{this.props.event.date}</em></small>
        </p>
        <p>{this.props.event.desc}</p>
      </Paper>
    );
  }
}