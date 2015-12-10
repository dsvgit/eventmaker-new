import { ROUTE } from '../constatnts/index.jsx';

export function createRouteAction (location) {
  return {
    type: ROUTE,
    payload: location
  };
}