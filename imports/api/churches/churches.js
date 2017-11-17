import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

export const Churches = new Mongo.Collection('churches');

Churches.schema = new SimpleSchema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  denomination: {
    type: String,
    optional: true
  },
  pastor: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  website: {
    type: String,
    optional: true
  },
  coordinates: {
    type: [Number],
    decimal: true
  },
  location: {
    type: Object
  },
  "location.city": {
    type: String
  },
  "location.address": {
    type: String
  },
  "location.zipCode": {
    type: String
  },
  "location.state": {
    type: String
  },
  "location.country": {
    type: String
  },
  yelp: {
    type: Object
  },
  "yelp.id": {
    type: String
  },
  "yelp.url": {
    type: String
  },
  "yelp.imageUrl": {
    type: String
  },
  claimed: {
    type: Boolean,
    optional: true
  },
  claimerId: {
    type: String,
    optional: true
  }
});

Churches.attachSchema(Churches.schema);

Churches.attachBehaviour('timestampable');

Churches.friendlySlugs('name');

Churches.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});
