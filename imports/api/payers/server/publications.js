import { Meteor } from 'meteor/meteor';
import { Payers } from '../payers.js';

Meteor.publish('payers.currentUser', function () {
  return Payers.find({ createdBy: this.userId });
});
