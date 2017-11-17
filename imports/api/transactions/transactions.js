import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

export const Transactions = new Mongo.Collection('transactions');

Transactions.schema = new SimpleSchema({
  paymentId: {
    type: String
  },
  churchId: {
    type: String
  },
  response: {
    type: Object,
    blackbox: true
  }
});

Transactions.attachSchema(Transactions.schema);

Transactions.attachBehaviour('timestampable');

Transactions.allow({
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

