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

import nameToColor from 'app/js/utils/nameToColor.jsx';

import { fetchUser } from '../actions/index.jsx';

class UserPage extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchUser(this.props.params.userID));
  }

  render() {
    var user = this.props.user;
    console.log('user page render ', this.props);
    return (
      <div>
        <Paper zDepth={1} className="user-create-form">
          <Avatar
            backgroundColor={nameToColor(user.login)}
            style={{'marginRight': '10px'}}>
            {user.login.slice(0,1).toUpperCase()}</Avatar>
          <span>{user.login}</span>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </Paper>
      </div>
    );
  }
}

function selectUser(state) {
  return {
    user: state.user
  };
}

export default connect(selectUser)(UserPage);