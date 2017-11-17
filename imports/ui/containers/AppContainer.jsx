import { Meteor } from 'meteor/meteor';
import { Geolocation } from 'meteor/mdg:geolocation';
import { createContainer } from 'meteor/react-meteor-data';

import { Churches } from '../../api/churches/churches.js';

import App from '../layouts/App.jsx';

export default AppContainer = createContainer(props => {

  let churchesHandle;

  let location = Geolocation.currentLocation();

  if (location && location.coords) {
    churchesHandle = Meteor.subscribe("churches.near", location);
  }

  return {
    churches: churchesHandle && churchesHandle.ready() ? Churches.find().fetch() : []
  };
}, App);
