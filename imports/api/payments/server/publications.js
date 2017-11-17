import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { UserRoles } from '../../../startup/both/business.js';


//collection
import { Payments } from '../payments.js';
import { Payers } from '../../payers/payers.js';

//enums
import Status from '../enums/status.js';

Meteor.publishComposite('payments', {

  find: function() {
    return Payments.find({ });
  },
  children: [
    {
      find: function(payment) {
        return Meteor.users.find({ _id: payment.userId });
      },
    },
  ]
});

Meteor.publishComposite('payments.user',  (userId) => {
  return {
    find: function() {
      return Payments.find({ userId: userId });
    },
    children: [
      {
        find: function(payment) {
          return Meteor.users.find({ _id: payment.userId });
        },
      },
    ]
  }
});

Meteor.publishComposite('payments.user.pending',  (userId) => {
  return {
    find: function() {
      return Payments.find({ userId: userId, status: Status.pending });
    },
    children: [
      {
        find: function(payment) {
          return Meteor.users.find({ _id: payment.userId });
        },
      },
    ]
  }
});

Meteor.publishComposite('payments.user.dueNow',  (userId) => {
  return {
    find: function() {
      return Payments.find({ userId: userId, status: Status.due_now });
    },
    children: [
      {
        find: function(payment) {
          return Meteor.users.find({ _id: payment.userId });
        },
        children: [
          {
            find: function(user) {
              return Payers.find({ createdBy: user._id });
            },
          },
        ]
      },
    ]
  }
});
