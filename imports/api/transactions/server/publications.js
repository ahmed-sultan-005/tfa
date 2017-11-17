import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Transactions } from '../transactions.js';

Meteor.publish('transactions.church', function (churchId ) {
  return Transactions.find({ churchId: churchId });
});

Meteor.publish('transactions.church.user', function (churchId) {
  return Transactions.find({ churchId: churchId, createdBy: this.userId });
});
