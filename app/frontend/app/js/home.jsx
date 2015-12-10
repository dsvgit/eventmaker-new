import React from 'react';
import { Route, Link } from 'react-router';


export class Home extends React.Component {
  render () {
    return (
      <div>
        <h1 className="common-main-header">Eventamker</h1>
        <p className="home-content">Welcome to event maker! Find here what you want!</p>
      </div>
    )
  }
}