import React from 'react';
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
    return (
      <TableRow>
        <TableRowColumn>
          <Checkbox
            className="users-table-input-checkbox"
            onClick={this.handleMark.bind(this)} />
        </TableRowColumn>
        <TableRowColumn>{ this.props.user.firstName }</TableRowColumn>
        <TableRowColumn>{ this.props.user.login }</TableRowColumn>
      </TableRow>
    );
  }
}