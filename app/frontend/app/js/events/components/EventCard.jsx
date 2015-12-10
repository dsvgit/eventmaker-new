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
import FlatButton from 'material-ui/lib/flat-button';

import { fetchCurrentEvent } from '../actions/index.jsx';

class EventCard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props.dispatch);
    this.props.dispatch(fetchCurrentEvent(this.props.params.eventID));
  }

  render() {
    console.log('event card render ', this.props);
    return (
      <div>
        <Card>
          <CardHeader
            title="User name"
            subtitle="user desc"
            avatar="/images/default-avatar.jpg"/>
          <CardMedia overlay={<CardTitle title={this.props.event.name} subtitle={this.props.event.date}/>}>
            <div className="event-card-image-wrap">

            </div>
          </CardMedia>
          <CardActions>
            <FlatButton label="I go!"/>
            <FlatButton label="May be go"/>
          </CardActions>
          <CardText>
            {this.props.event.desc}.
          </CardText>
        </Card>
      </div>
    );
  }
}

function selectEvent(state) {
  return {
    event: state.event
  };
}

export default connect(selectEvent)(EventCard);