import { api } from 'app/js/utils/url.jsx';
import { UPDATE_EVENTS, UPDATE_CURRENT_EVENT } from '../constants/index.jsx'

function updateEvents(events) {
  console.log('action update events', events);
  return { type: UPDATE_EVENTS, events}
}

export function fetchEvents() {
  return dispatch => {
    $.ajax({
      url: api('api/events'),
      method: 'GET',
      success: function(resp) {
        console.log('action fetch events', resp);
        dispatch(updateEvents(resp));
      }
    });
  }
}

export function addEvent(event) {
  return dispatch => {
    $.ajax({
      url: api('api/events'),
      method: 'POST',
      data: JSON.stringify(event),
      success: function(resp) {
        console.log('action add event');
        dispatch(fetchEvents());
      }
    });
  }
}

export function searchEvents(text) {
  return dispatch => {
    $.ajax({
      url: api('api/events/search'),
      method: 'GET',
      data: { searchText: text },
      success: function(resp) {
        console.log('action fetch events', resp);
        dispatch(updateEvents(resp));
      }
    });
  }
}

export function filterEventsByOwner(filter) {
  return dispatch => {
    $.ajax({
      url: api('api/events/filter-owner'),
      method: 'GET',
      data: { filter: filter },
      success: function(resp) {
        console.log('action filter by owner events', resp);
        dispatch(updateEvents(resp));
      }
    });
  }
}

function updateCurrentEvent(event) {
  console.log('action current update event', event);
  return { type: UPDATE_CURRENT_EVENT, event }
}

export function fetchCurrentEvent(id, callback) {
  return dispatch => {
    $.ajax({
      url: api('api/events/' + id),
      method: 'GET',
      success: function(resp) {
        console.log('action fetch current event', resp);
        if (callback) callback(resp);
        dispatch(updateCurrentEvent(resp));
      }
    });
  }
}

export function editCurrentEvent(event) {
  return dispatch => {
    $.ajax({
      url: api('api/events/'),
      method: 'PUT',
      data: JSON.stringify(event),
      success: function(resp) {
        console.log('action edit current event');
        dispatch(fetchCurrentEvent(event.id));
      }
    });
  }
}

export function addRegistration(reg) {
  return dispatch => {
    $.ajax({
      url: api('api/events/add-registration'),
      method: 'PUT',
      data: JSON.stringify(reg),
      success: function(resp) {
        console.log('action add registration');
        dispatch(fetchCurrentEvent(reg.eventId));
      }
    });
  }
}

export function deleteRegistration(reg) {
  return dispatch => {
    $.ajax({
      url: api('api/events/delete-registration'),
      method: 'PUT',
      data: JSON.stringify(reg),
      success: function(resp) {
        console.log('action add registration');
        dispatch(fetchCurrentEvent(reg.eventId));
      }
    });
  }
}

export function inviteUser(reg, callback) {
  return dispatch => {
    $.ajax({
      url: api('api/events/invite-user'),
      method: 'PUT',
      data: JSON.stringify(reg),
      success: function(resp) {
        console.log('action add registration');
        dispatch(fetchCurrentEvent(reg.eventId, callback));
      }
    });
  }
}