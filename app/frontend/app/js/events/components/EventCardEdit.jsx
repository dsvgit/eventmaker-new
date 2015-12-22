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

import DatePicker from 'material-ui/lib/date-picker/date-picker';
import DatePickerDialog from 'material-ui/lib/date-picker/date-picker-dialog';
import TextField from 'material-ui/lib/text-field';

import { fetchCurrentEvent, editCurrentEvent } from '../actions/index.jsx';
import { fetchUsers }  from 'app/js/users/actions/index.jsx';

import nameToColor from 'app/js/utils/nameToColor.jsx';

class EventCardEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      date: null,
      desc: ''
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

  handleDateChange(e, date) {
    console.log('set date: ', date);
    this.setState({
        date: date
    });
  }

  callback(event) {
    this.state = event;
  }

  render() {
    var users = this.props.users.map(function(user) {
      return <ListItem primaryText={user.firstName} />
    });
    console.log('users to add: ', users);

    console.log('event card render ', this.props);
    var event = this.state;
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
            <CardText>
              {event.desc}
            </CardText>
          </Card>
        </div>
        <div className="event-card-edit-form">
          <Paper zDepth={1} className="user-create-form">
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
            <List subheader="Users to add: ">
              {users}
            </List>
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