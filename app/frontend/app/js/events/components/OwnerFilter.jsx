import React from 'react';

export default class OwnerFilter extends React.Component {
  render() {
    return (
      <div className="events-owner-filter-main">
        <a href="#all">all </a>
        <a href="#own">my own </a>
      </div>
    );
  }
}