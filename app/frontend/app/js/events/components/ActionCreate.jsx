import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import DatePickerDialog from 'material-ui/lib/date-picker/date-picker-dialog';
import TextField from 'material-ui/lib/text-field';

import { addEvent } from '../actions/index.jsx';

var _initState = {
  name: '',
  date: null,
  desc: ''
};

class ActionCreate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDialogStandardActions: false,
      createState: _initState
    }
  }

  handleOpen() {
    this.setState({
      showDialogStandardActions: true
    });
  }

  handleCreate() {
    console.log('action event create ', this.state);
    this.props.dispatch(addEvent(this.state.createState));
    this.setState({
      showDialogStandardActions: false
    });
    this._resetState();
  }

  handleClose() {
    this.setState({
      showDialogStandardActions: false
    });
    this._resetState();
  }

  _resetState() {
    this.state.createState = _initState;
  };

  handleChange(field, e) {
    console.log(this.state);
    var nextState = {};
    nextState[field] = e.target.value;
    this.setState({
      createState: Object.assign({}, this.state.createState, nextState)
    });
  }

  handleDateChange(e, date) {
    this.setState({
      createState: Object.assign({}, this.state.createState, { date: date })
    });
  }

  render() {

    let standardActions = [
      { text: 'Cancel', onClick: this.handleClose.bind(this) },
      { text: 'Create', onClick: this.handleCreate.bind(this) }
    ];

    console.log(this.state);
    return (
      <div>
        <RaisedButton label="Create" onClick={this.handleOpen.bind(this)} secondary={true} />
        <Dialog
          title="Create event"
          autoScrollBodyContent={true}
          actions={standardActions}
          open={this.state.showDialogStandardActions}>
          <form style={{'max-height': '600px'}}>
            <TextField
              fullWidth={true}
              hintText="Title"
              onChange={this.handleChange.bind(this, 'name')}/>
            <DatePicker
              fullWidth={true}
              hintText="Event date"
              mode="landscape"
              onChange={this.handleDateChange.bind(this)}/>
            <TextField
              fullWidth={true}
              hintText="Description"
              multiLine={true}
              inputStyle={{'height': '300px'}}
              onChange={this.handleChange.bind(this, 'desc')}/>
          </form>
        </Dialog>
      </div>
    );
  }
}

function selectEvents(state) {
  return {
    events: state.events
  };
}

export default connect(selectEvents)(ActionCreate);