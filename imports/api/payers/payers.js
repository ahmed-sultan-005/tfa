import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

export const Payers = new Mongo.Collection('payers');

Payers.schema = new SimpleSchema({
  cardholderName: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  expiryMonth: {
    type: String,
  },
  expiryYear: {
    type: String,
  },
  cvv: {
    type: String,
  }
});

Payers.attachSchema(Payers.schema);

Payers.attachBehaviour('timestampable');

Payers.allow({
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
