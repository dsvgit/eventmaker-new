import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import { Link } from 'react-router';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import qajax from 'qajax';
import { api, jsonOptions, serializeQuery } from 'app/js/utils/url.jsx';

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
    console.log(this.props);
    var params = serializeQuery(this.state);
    qajax({
      url: api('api/auth/login?' + params),
      method: 'GET'
    }).then(resp => {
      console.log(resp.responseText);
      sessionStorage.setItem('token', resp.responseText);
      this.props.history.pushState(null, '/');
    })
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