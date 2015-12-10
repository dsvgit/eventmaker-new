import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import UsersTable from './UsersTable.jsx';

export default class UsersModule extends React.Component {
  render() {
    return (
      <div className="user-module-list-container">
        <h1 className="common-main-header">Users</h1>
        <UsersTable />
      </div>
    );
  }
}