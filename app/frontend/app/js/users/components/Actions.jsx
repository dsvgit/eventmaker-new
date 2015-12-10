import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/lib/raised-button';

import { Link } from 'react-router';

export default class Actions extends React.Component {

  handleDelete() {
    this.props.onDelete();
  }

  render() {
    console.log(this.state);
    return (
      <div className="users-actions-main">
        <div className="btn-group" role="group">
          <Link className="users-actions-link" to="/users/create">Create </Link>
          <Link className="users-actions-link" to="/users" onClick={this.handleDelete.bind(this)}>Delete </Link>
        </div>
      </div>
    );
  }
}