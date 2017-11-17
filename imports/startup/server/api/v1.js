import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import { SimpleRest } from 'meteor/simple:rest';

import { Churches } from '../../../api/churches/churches.js';

// Global API configuration
var Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});

// Generates: GET, POST on /api/churches and GET, PUT, DELETE on
// /api/churches/:id for the churches collection
Api.addCollection(Churches);

Api.addCollection(Meteor.users);

SimpleRest.configure({
  collections: ['churches']
});
