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
import Paper from 'material-ui/lib/paper';
import DropDownMenu from 'material-ui/lib/drop-down-menu';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';

import { Link } from 'react-router';

import MoreVertIcon from 'react-material-icons/icons/navigation/more-vert';

import { fetchCurrentEvent, addRegistration, deleteRegistration } from '../actions/index.jsx';

class EventCard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props.dispatch);
    this.props.dispatch(fetchCurrentEvent(this.props.params.eventID));
  }

  handleEdit() {
    this.props.history.pushState(null, '/event/edit/' + this.props.params.eventID);
  }

  handleGo() {
    console.log('event card try add reg', {
      eventId: this.props.params.eventID
    });

    this.props.dispatch(addRegistration({
      eventId: this.props.params.eventID
    }));
  }

  handleDontGo() {
    console.log('event card try add reg', {
      eventId: this.props.params.eventID
    });

    this.props.dispatch(deleteRegistration({
      eventId: this.props.params.eventID
    }));
  }

  handleGoToProfile(userId) {
    this.props.history.pushState(null, '/user/' + userId);
  }

  render() {
    console.log('event card render ', this.props);
    var event = Object.assign({}, this.props.event);
    console.log('render event card, is editable: ', event.editable);
    console.log('render event card, regs', event.regs);

    var self = this;

    var regs = event.regs.slice().map(function(reg) {
      if (reg.status == 'CONFIRMED') {
        return <ListItem
          key={reg.user.id}
          primaryText={reg.user.firstName}
          rightIcon={<MoreVertIcon />}
          onClick={self.handleGoToProfile.bind(self, reg.user.id)}
          />;
      }
    });

    return (
      <div className="event-card-main">
        <div className="event-card-content">
          <Card>
            <CardHeader
              title="User name"
              subtitle="user desc"
              avatar="/images/default-avatar.jpg"/>
            <CardMedia overlay={<CardTitle title={this.props.event.name} subtitle={""+this.props.event.date}/>}>
              <div className="event-card-image-wrap">

              </div>
            </CardMedia>
            <CardActions>
              <FlatButton label="I'll be there" onClick={this.handleGo.bind(this)}/>
              <FlatButton label="No, thanks" onClick={this.handleDontGo.bind(this)}/>
              <FlatButton
                label="Edit"
                onClick={this.handleEdit.bind(this)}
                disabled={!event.editable}/>
            </CardActions>
            <CardText>
              {this.props.event.desc}.
            </CardText>
          </Card>
        </div>
        <div className="event-card-regs">
          <Paper zDepth={1}>
            <List subheader="Participants:">
              {regs}
            </List>
          </Paper>
        </div>
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