import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import { Link } from 'react-router';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import { api } from 'app/js/utils/url.jsx';

import { login } from '../actions/index.jsx';

var _initState = {
  login: '',
  password: ''
};

class Login extends React.Component {

  constructor(props) {
    super(props);

    this._resetState();
  }

  _resetState() {
    this.state = _initState;
  };

  handleChange(field, e) {
    console.log(this.state);
    var nextState = {};
    nextState[field] = e.target.value;
    this.setState(nextState);
  }

  handleLogin() {
    console.log('try login', this.props);

    $.ajax({
      url: api('api/auth/login'),
      method: 'POST',
      data: JSON.stringify(this.state),
      success: function(resp) {
        console.log('login success');
        console.log(resp);
        sessionStorage.setItem('token', resp.authToken);
        var url = '/';
        document.location.replace(url);
      },
      error: function(e) {
        console.log('login error', e);
      }
    });
  }

  render() {
    return (
      <div className="login-page-main">
        <Paper zDepth={5} className="login-page-form-main">
          <h2>welcome to eventmaker</h2>
          <form>
            <TextField
              hintText="login"
              floatingLabelText="login"
              onChange={this.handleChange.bind(this, 'login')}/>
            <TextField
              hintText="password"
              floatingLabelText="password"
              type="password"
              onChange={this.handleChange.bind(this, 'password')}/>
            <FlatButton
              style={{'marginTop': '15px'}}
              label="log in.."
              secondary={true}
              onClick={this.handleLogin.bind(this)}>
            </FlatButton>
          </form>
        </Paper>
      </div>
    );
  }
}

function select(state) {
  return {

  };
}

export default connect(select)(Login);