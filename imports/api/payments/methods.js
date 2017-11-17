import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import moment from 'moment';

// business logic
import { UserRoles } from '../../startup/both/business.js';

// payments collection
import { Payments } from './payments.js';

//enums
import Status from './enums/status.js';

Meteor.methods({
  'payments.new'(data) {

    check(data,Object);

    let paymentId = Payments.insert({
      amount: data.amount,
      userId: Meteor.userId(),
      churchId: data.churchId,
      isRecurring: data.isRecurring
    });

    return paymentId;

  },
  'payments.reject'(paymentId) {
    check(paymentId, String);

    Payments.update({ _id: paymentId }, {
      $set: {
        status: Status.rejected
      }
    });
  }
});
