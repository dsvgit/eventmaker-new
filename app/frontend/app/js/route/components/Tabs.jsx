import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { api } from 'app/js/utils/url.jsx';
import Avatar from 'material-ui/lib/avatar';

import nameToColor from 'app/js/utils/nameToColor.jsx';

import { fetchCurrentUser } from 'app/js/users/actions/index.jsx';

class Tabs extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchCurrentUser());
  }

  handleLogout() {
    $.ajax({
      url: api('api/auth/logout'),
      method: 'POST',
      success: function() {
        var url = '/login';
        document.location.replace(url);
      }
    });
  }

  render() {
    var user = this.props.currentUser;
    return (
      <div>
        <div className="common-tabs-main">
          <Link className="common-tab-main" to="/">home </Link>
          <Link className="common-tab-main" to="/users">users </Link>
          <Link className="common-tab-main" to="/events">events </Link>
          <a
            href="#"
            className="common-tab-main common-tab-right last"
            onClick={this.handleLogout.bind(this)}>
            log out</a>

          <Link className="common-tab-main common-tab-right" to="/profile">profile </Link>
          <div className="common-tab-right common-tabs-avatar-main">
            <span className="common-tabs-login">{user.login}</span>
            <Avatar
              backgroundColor={nameToColor(user.login)}
              style={{
              'marginRight': '10px'
               }}>
              {user.login.slice(0,1).toUpperCase()}
            </Avatar>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

function selectCurrentUser(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(selectCurrentUser)(Tabs);