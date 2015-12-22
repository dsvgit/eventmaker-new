import React from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardExpandable from 'material-ui/lib/card/card-expandable';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import Avatar from 'material-ui/lib/avatar';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import nameToColor from 'app/js/utils/nameToColor.jsx';

import { fetchCurrentUser, editCurrentUser } from '../actions/index.jsx';

class UserProfile extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchCurrentUser(this.callback.bind(this)));
  }

  callback(user) {
    this.state = user;
  }

  constructor(props, context) {
    super(props);

    this.state = {
      name: '',
      login: '',
      email: ''
    };
  }

  handleChange(field, e) {
    var nextState = {};
    nextState[field] = e.target.value;
    console.log(nextState);
    this.setState(nextState);
  }

  handleSave() {
    this.props.dispatch(editCurrentUser(this.state));
  }

  handleCancel() {
    this.props.dispatch(fetchCurrentUser(this.callback.bind(this)));
  }

  render() {
    var user = this.state;
    console.log('user profile render ', this.props);
    return (
      <div>
        <Paper zDepth={1} className="user-create-form">
          <Avatar
            backgroundColor={nameToColor(user.login)}
            style={{'marginRight': '10px'}}>
            {user.login.slice(0,1).toUpperCase()}</Avatar>
          <TextField
            floatingLabelText="Login"
            onChange={this.handleChange.bind(this, 'login')}
            value={user.login}
            />
          <p><TextField
            floatingLabelText="First name"
            onChange={this.handleChange.bind(this, 'name')}
            value={user.name}
            /></p>
          <p><TextField
            floatingLabelText="E-mail"
            onChange={this.handleChange.bind(this, 'email')}
            value={user.email}
            /></p>
          <RaisedButton style={{'margin-right': '10px'}} label="Save" onClick={this.handleSave.bind(this)} secondary={true} />
          <RaisedButton label="Cancel" onClick={this.handleCancel.bind(this)} secondary={true} />
        </Paper>
      </div>
    );
  }
}

function selectCurrentUser(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(selectCurrentUser)(UserProfile);