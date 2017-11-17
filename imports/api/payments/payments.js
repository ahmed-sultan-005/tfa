import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

import Status from './enums/status.js';

export const Payments = new Mongo.Collection('payments');

Payments.schema = new SimpleSchema({
  amount: {
    type: Number,
    decimal: true
  },
  userId: { // client id
    type: String
  },
  churchId: {
    type: String
  },
  isRecurring: {
   type: Boolean
  },
  status: {
    type: String,
     autoValue: function() {
      if (this.isInsert) {
        return Status.pending;
      }
    }
  }
});

Payments.attachSchema(Payments.schema);

Payments.attachBehaviour('timestampable');

// if payment is recurring update the due date
Payments.before.update(function (userId, doc, fieldNames, modifier, options) {
  if (doc.isRecurring && doc.status == Status.due_now) {
    modifier.$set.dueDate = moment(doc.dueDate).add(1, 'M').toDate();
    modifier.$set.status = Status.pending;
  }
});

Payments.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});
