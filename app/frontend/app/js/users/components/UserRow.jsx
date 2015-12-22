import React from 'react';
import { Link } from 'react-router';
import Checkbox from 'material-ui/lib/checkbox';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import { MARK, UNMARK } from '../constants/index.jsx';

export class UserRow extends React.Component {

  handleMark(e) {
    var type = e.target.checked ? MARK : UNMARK;
    console.log(type, this.props.user.id);
    this.props.onChangeMarked({
      type: type,
      id: this.props.user.id
    });
  }

  render() {
    var user = this.props.user;
    return (
      <TableRow>
        <TableRowColumn>
          <Checkbox
            className="users-table-input-checkbox"
            onClick={this.handleMark.bind(this)} />
        </TableRowColumn>
        <TableRowColumn>
          <Link to={'user/' + user.id}>{ user.firstName }</Link>
        </TableRowColumn>
        <TableRowColumn>{ user.login }</TableRowColumn>
        <TableRowColumn>{ user.email }</TableRowColumn>
      </TableRow>
    );
  }
}