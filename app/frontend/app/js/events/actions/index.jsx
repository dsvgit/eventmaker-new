import qajax from 'qajax';

import { api, jsonOptions, serializeQuery } from 'app/js/utils/url.jsx';
import { UPDATE_EVENTS, UPDATE_CURRENT_EVENT } from '../constants/index.jsx'

function updateEvents(events) {
  console.log('action update events', events);
  return { type: UPDATE_EVENTS, events}
}

export function fetchEvents() {
  return dispatch => {
    qajax({
      url: api('api/events'),
      method: 'GET',
      headers: jsonOptions('GET')
    }).then(resp => {
      console.log('action fetch events', JSON.parse(resp.responseText));
      dispatch(updateEvents(JSON.parse(resp.responseText)));
    });
  }
}

export function addEvent(event) {
  return dispatch => {
    qajax({
      url: api('api/events'),
      method: 'POST',
      data: event,
      headers: jsonOptions('POST')
    }).then(resp => {
      console.log('action add event');
      dispatch(fetchEvents());
    });
  }
}

export function searchEvents(text) {
  var params = serializeQuery({ searchText: text });
  return dispatch => {
    qajax({
      url: api('api/events/search?' + params),
      method: 'GET',
      data: { searchText: text },
      headers: jsonOptions('GET')
    }).then(resp => {
      console.log('action fetch events', JSON.parse(resp.responseText));
      dispatch(updateEvents(JSON.parse(resp.responseText)));
    });
  }
}

function updateCurrentEvent(event) {
  console.log('action current update event', event);
  return { type: UPDATE_CURRENT_EVENT, event }
}

export function fetchCurrentEvent(id) {
  var params = serializeQuery({ id: id });
  return dispatch => {
    qajax({
      url: api('api/events/' + id),
      method: 'GET',
      headers: jsonOptions('GET')
    }).then(resp => {
      console.log('action fetch current event', JSON.parse(resp.responseText));
      dispatch(updateCurrentEvent(JSON.parse(resp.responseText)));
    });
  }
}
