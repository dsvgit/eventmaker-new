import React from 'react';
import { connect } from 'react-redux';

import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

import { deleteUsers, fetchUsers } from '../actions/index.jsx';
import { MARK, UNMARK } from '../constants/index.jsx';
import { UserRow } from './UserRow.jsx';
import Actions from './Actions.jsx';

class UsersTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      marked: []
    };
  };

  componentWillMount() {
    console.log('users component ComponentDidMount');
    this.props.dispatch(fetchUsers());
  }

  onChangeMarked(action) {
    switch (action.type) {
      case MARK:
        this.setState({
          marked: [action.id, ...this.state.marked.slice()]
        });
        break;
      case UNMARK:
        this.setState({
          marked: this.state.marked.filter(id => {
            return id != action.id;
          })
        });
        break;
      default:

    };
    console.log('marked array', this.state.marked);
  }

  handleDelete() {
    this.props.dispatch(deleteUsers(this.state.marked));
    this.setState({
      marked: []
    });
  }

  render() {
    var users = this.props.users.map((user) => {
      return <UserRow key={user.id} user={user} onChangeMarked={this.onChangeMarked.bind(this)}/>;
    });
    return (
      <div>
        <Actions onDelete={this.handleDelete.bind(this)}/>
        <Table className="table">
          <TableHeader>
          <TableRow>
            <TableHeaderColumn style={{textAlign: 'center'}}></TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Login</TableHeaderColumn>
            <TableHeaderColumn>E-mail</TableHeaderColumn>
          </TableRow>
          </TableHeader>
          <TableBody showRowHover={true}>
            {users}
          </TableBody>
        </Table>
      </div>
    );
  }
}


function selectUsers(state) {
  return {
    users: state.users
  };
}

export default connect(selectUsers)(UsersTable);