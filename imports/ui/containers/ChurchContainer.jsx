import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import NewChurch from '../pages/churches/New.jsx';

import { Churches } from '../../api/churches/churches.js';

export default ChurchContainer = createContainer(props => {
  const { id } = props;

  const churchHandle = Meteor.subscribe("churches.show", id);

  return {
    church: churchHandle.ready() ? Churches.findOne() : {},
  };
}, NewChurch);
