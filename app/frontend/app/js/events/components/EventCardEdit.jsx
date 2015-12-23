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
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import DatePicker from 'material-ui/lib/date-picker/date-picker';
import DatePickerDialog from 'material-ui/lib/date-picker/date-picker-dialog';
import TextField from 'material-ui/lib/text-field';

import { fetchCurrentEvent, editCurrentEvent, inviteUser } from '../actions/index.jsx';
import { fetchUsers }  from 'app/js/users/actions/index.jsx';

import nameToColor from 'app/js/utils/nameToColor.jsx';

class EventCardEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      date: null,
      desc: '',
      regs: []
    };
  }

  componentWillMount() {
    console.log(this.props.dispatch);
    this.props.dispatch(fetchCurrentEvent(this.props.params.eventID, this.callback.bind(this)));
    this.props.dispatch(fetchUsers());
  }

  handleChange(field, e) {
    var nextState = {};
    nextState[field] = e.target.value;
    console.log(nextState);
    this.setState(nextState);
  }

  handleSave() {
    this.props.dispatch(editCurrentEvent(this.state));
  }

  handleCancel() {
    this.props.dispatch(fetchCurrentEvent(this.props.params.eventID, this.callback.bind(this)));
  }

  handleCard() {
    this.props.history.pushState(null, '/event/' + this.props.params.eventID);
  }

  handleDateChange(e, date) {
    console.log('set date: ', date);
    this.setState({
        date: date
    });
  }

  callback(event) {
    console.log('from callback', event);
    this.state = event;
  }

  handleInviteUser(userId) {
    console.log('event card try invite user', {
      eventId: this.props.params.eventID,
      userId: userId
    });

    this.props.dispatch(inviteUser({
      eventId: this.props.params.eventID,
      userId: userId
    }, this.callback.bind(this)));

  }

  render() {
    var self = this;
    var event = this.state;
    var regs = event.regs;
    console.log('event registrations', regs);

    var users = this.props.users.map(function(user) {
      return <ListItem primaryText={user.firstName} onClick={self.handleInviteUser.bind(self, user.id)} />
    });
    var participants = regs.map(function(reg) {
      if (reg.status == 'CONFIRMED')
        return <ListItem primaryText={reg.user.firstName} />
    });
    var invited = regs.map(function(reg) {
      if (reg.status == 'INVITED')
        return <ListItem primaryText={reg.user.firstName} />
    });
    console.log('users to add: ', users);

    console.log('event card render ', this.props);
    console.log('event date', event.date);
    return (
      <div className="event-card-edit-main">
        <div className="event-card-edit-content">
          <Card>
            <CardHeader
              title="User name"
              subtitle="user desc"
              avatar="/images/default-avatar.jpg"/>
            <CardMedia overlay={<CardTitle title={event.name} subtitle={""+event.date}/>}>
              <div className="event-card-image-wrap">

              </div>
            </CardMedia>
            <CardActions>
            </CardActions>
            <FlatButton label="To card" onClick={this.handleCard.bind(this)} secondary={true} />
            <CardText>
              {event.desc}
            </CardText>
          </Card>
        </div>
        <div className="event-card-edit-form">
          <Paper zDepth={1} className="user-create-form">
            <Tabs>
              <Tab label="users" >
                <List subheader="Invite users: ">
                  {users}
                </List>
              </Tab>
              <Tab label="participants" >
                <List subheader="Participants: ">
                  {participants}
                </List>
              </Tab>
              <Tab
                label="invited">
                <List subheader="Invited: ">
                  {invited}
                </List>
              </Tab>
            </Tabs>
            <TextField
              fullWidth={true}
              hintText="Title"
              onChange={this.handleChange.bind(this, 'name')}
              value={event.name} />
            <DatePicker
              fullWidth={true}
              hintText="Set date"
              mode="landscape"
              onChange={this.handleDateChange.bind(this)}
              />
            <TextField
              fullWidth={true}
              hintText="Description"
              multiLine={true}
              inputStyle={{'height': '300px'}}
              onChange={this.handleChange.bind(this, 'desc')}
              value={event.desc} />
            <RaisedButton style={{'margin-right': '10px'}} label="Save" onClick={this.handleSave.bind(this)} secondary={true} />
            <RaisedButton label="Cancel" onClick={this.handleCancel.bind(this)} secondary={true} />
          </Paper>
        </div>
      </div>
    );
  }
}

function selectEvent(state) {
  return {
    users: state.users,
    event: state.event
  };
}

export default connect(selectEvent)(EventCardEdit);