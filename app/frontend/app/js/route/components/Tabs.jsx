import React from 'react';
import { Link } from 'react-router';

export class Tabs extends React.Component {
  render() {
    return (
      <div>
        <div className="common-tabs-main">
          <Link className="common-tab-main" to="/">home </Link>
          <Link className="common-tab-main" to="/users">users </Link>
          <Link className="common-tab-main" to="/events">events </Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}