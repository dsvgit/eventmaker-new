import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import { addUser } from '../actions/index.jsx';

class UsersCreateForm extends React.Component {

  constructor(props, context) {
    super(props);

    this.state = {
      firstName: '',
      login: ''
    };
  }

  handleChange(field, e) {
    var nextState = {};
    nextState[field] = e.target.value;
    this.setState(nextState);
  }

  handleCreate() {
    if (!(this.state.firstName && this.state.login)) return;

    var user = {
      firstName: this.state.firstName,
      login: this.state.login
    };
    console.log('user create form create', user);
    this.props.dispatch(addUser(user));
    this.props.history.pushState(null, '/users');
  }

  handleCancel() {
    this.props.history.pushState(null, '/users');
  }

  render() {
    return (
      <div className="user-create-form-container">
        <h1 className="common-main-header">Create user</h1>
        <Paper zDepth={1} className="user-create-form">
          <p>Please enter your data for create user</p>

          <TextField floatingLabelText="First Name" onChange={this.handleChange.bind(this, 'firstName')}/>
          <TextField floatingLabelText="Login" onChange={this.handleChange.bind(this, 'login')}/>
          <div>
            <RaisedButton style={{'margin-right': '10px'}} label="Create" onClick={this.handleCreate.bind(this)} secondary={true} />
            <RaisedButton label="Cancel" onClick={this.handleCancel.bind(this)} secondary={true} />
          </div>
        </Paper>
      </div>
    );
  }
}

function selectUsers(state) {
  return {
    users: state.users
  };
}

export default connect(selectUsers)(UsersCreateForm);